import {
  getDownloadURL,
  getMetadata,
  getStorage,
  listAll,
  ref,
} from "firebase/storage";
import {
  doc,
  DocumentData,
  DocumentSnapshot,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import {
  MirrorGalleryDoc,
  getMirrorMediaPreviewSrc,
  MirrorLibraryItem,
  MirrorMediaType,
} from "../types/mediaTypes";
import initFB from "./initFirebase";

export const MIRROR_GALLERY_COLLECTION = "mirror";
export const MIRROR_GALLERY_DOC_ID = "gallery";
export const MIRROR_STORAGE_MEDIA_DIR = "mirror/media";
export const MIRROR_STORAGE_POSTER_DIR = "mirror/posters";
export const MIRROR_IMAGE_MIME_TYPE = "image/jpeg";
export const MIRROR_VIDEO_MIME_TYPE = "video/mp4";

const getMirrorFirestore = () => getFirestore(initFB());

const IMAGE_EXTENSIONS = [".jpg", ".jpeg"];
const VIDEO_EXTENSIONS = [".mp4"];

const getFileExtension = (path: string) => {
  const fileName = path.split("/").pop() ?? "";
  const dotIndex = fileName.lastIndexOf(".");
  return dotIndex === -1 ? "" : fileName.slice(dotIndex).toLowerCase();
};

export const getMirrorMediaIdFromPath = (path: string) => {
  const fileName = path.split("/").pop() ?? "";
  const dotIndex = fileName.lastIndexOf(".");
  return dotIndex === -1 ? fileName : fileName.slice(0, dotIndex);
};

export const getMirrorMediaTypeFromPath = (
  path: string,
  contentType?: string | null
): MirrorMediaType | null => {
  if (contentType?.startsWith("video/")) return "video";
  if (contentType?.startsWith("image/")) return "image";

  const extension = getFileExtension(path);

  if (VIDEO_EXTENSIONS.includes(extension)) return "video";
  if (IMAGE_EXTENSIONS.includes(extension)) return "image";

  return null;
};

export const buildMirrorMediaStoragePath = (
  mediaId: string,
  type: MirrorMediaType
) =>
  `${MIRROR_STORAGE_MEDIA_DIR}/${mediaId}.${type === "video" ? "mp4" : "jpg"}`;

export const buildMirrorPosterStoragePath = (mediaId: string) =>
  `${MIRROR_STORAGE_POSTER_DIR}/${mediaId}.jpg`;

export const createMirrorUploadMetadata = ({
  mediaId,
  type,
  posterStoragePath,
}: {
  mediaId: string;
  type: MirrorMediaType;
  posterStoragePath?: string | null;
}) => ({
  contentType: type === "video" ? MIRROR_VIDEO_MIME_TYPE : MIRROR_IMAGE_MIME_TYPE,
  customMetadata: {
    mediaId,
    type,
    posterStoragePath: posterStoragePath ?? "",
  },
});

export const getMirrorGalleryDocRef = () =>
  doc(getMirrorFirestore(), MIRROR_GALLERY_COLLECTION, MIRROR_GALLERY_DOC_ID);

export const observeMirrorGalleryDoc = (
  onNext: (snapshot: DocumentSnapshot<DocumentData>) => void,
  onError?: (error: Error) => void
) => onSnapshot(getMirrorGalleryDocRef(), onNext, onError);

export const saveMirrorGalleryDoc = async (galleryDoc: MirrorGalleryDoc) => {
  await setDoc(getMirrorGalleryDocRef(), galleryDoc);
};

export const listMirrorLibraryItems = async () => {
  const storage = getStorage();
  const storageResponse = await listAll(ref(storage, MIRROR_STORAGE_MEDIA_DIR));

  const items = await Promise.all(
    storageResponse.items.map(async (itemRef): Promise<MirrorLibraryItem | null> => {
      const metadata = await getMetadata(itemRef);
      const type = getMirrorMediaTypeFromPath(
        itemRef.fullPath,
        metadata.contentType
      );

      if (!type) return null;

      const src = await getDownloadURL(itemRef);
      const mediaId =
        metadata.customMetadata?.mediaId ?? getMirrorMediaIdFromPath(itemRef.fullPath);
      const posterStoragePath =
        type === "video"
          ? metadata.customMetadata?.posterStoragePath ||
            buildMirrorPosterStoragePath(mediaId)
          : null;

      let posterSrc: string | null = null;

      if (posterStoragePath) {
        try {
          posterSrc = await getDownloadURL(ref(storage, posterStoragePath));
        } catch (error) {
          console.log("poster download error", error);
        }
      }

      const libraryItem: MirrorLibraryItem = {
        id: mediaId,
        type,
        src,
        posterSrc,
        previewSrc:
          type === "video" ? getMirrorMediaPreviewSrc({ type, src, posterSrc }) : src,
        mimeType:
          metadata.contentType ??
          (type === "video" ? MIRROR_VIDEO_MIME_TYPE : MIRROR_IMAGE_MIME_TYPE),
        storagePath: itemRef.fullPath,
        posterStoragePath,
        createdAt: metadata.timeCreated,
      };

      if (libraryItem.type === "video" && !libraryItem.posterSrc) {
        return null;
      }

      return libraryItem;
    })
  );

  return items
    .filter((item): item is MirrorLibraryItem => item !== null)
    .sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
};

import React, { useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { Alert } from "react-native";
import { Button } from "react-native-paper";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../../states/authState";
import { storagePhotosControlState } from "../../states/storagePhotosControlState";
import { storagePhotosCountSelctor } from "../../states/storagePhotosState";
import { storagePhotosState } from "../../states/storagePhotosState";
import * as S from "../../styles/home/FirestorePhotosControls.style";
import { useModal } from "../../hooks/useModal";
import FinishModal from "../modals/FinishModal";
import LoadingModal from "../modals/LoadingModal";
import { MirrorLibraryItem } from "../../types/mediaTypes";
import {
  buildMirrorMediaStoragePath,
  buildMirrorPosterStoragePath,
  createMirrorUploadMetadata,
  MIRROR_IMAGE_MIME_TYPE,
  MIRROR_VIDEO_MIME_TYPE,
} from "../../utils/mirrorMedia";
import {
  generateVideoPosterForMirror,
  normalizeVideoForMirror,
} from "../../utils/normalizeVideoForMirror";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { uuidv4 } from "@firebase/util";

const PHOTO_OUTPUT_MAX_DIMENSION = 1600;
const PHOTO_OUTPUT_COMPRESS = 0.85;

const FireStorePhotoControls = () => {
  const user = useRecoilValue(userState);
  const [storagePhotosControl, setStoragePhotosControl] = useRecoilState(
    storagePhotosControlState
  );
  const setStoragePhotos = useSetRecoilState(storagePhotosState);
  const storagePhotosLength = useRecoilValue(storagePhotosCountSelctor);
  const { openModal, changeModalContent, closeModal } = useModal();

  const toggleChangingMode = useCallback(() => {
    setStoragePhotosControl((prev) => ({
      ...prev,
      isChangingMode: !prev.isChangingMode,
      isDeletingMode: false,
    }));
  }, [setStoragePhotosControl]);

  const toggleDeletingMode = useCallback(() => {
    setStoragePhotosControl((prev) => ({
      ...prev,
      isDeletingMode: !prev.isDeletingMode,
      isChangingMode: false,
    }));
  }, [setStoragePhotosControl]);

  const createUploadBlob = useCallback(async (uri: string) => {
    return new Promise<Blob>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (event) {
        console.log(event);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  }, []);

  const uploadMediaFile = useCallback(
    async ({
      mediaId,
      type,
      localUri,
      storagePath,
      posterStoragePath,
    }: {
      mediaId: string;
      type: "image" | "video";
      localUri: string;
      storagePath: string;
      posterStoragePath?: string | null;
    }) => {
      const storage = getStorage();
      const blob = await createUploadBlob(localUri);
      const fileRef = ref(storage, storagePath);
      const result = await uploadBytes(
        fileRef,
        blob,
        createMirrorUploadMetadata({
          mediaId,
          type,
          posterStoragePath,
        })
      );
      const downloadUrl = await getDownloadURL(fileRef);

      return {
        downloadUrl,
        createdAt: result.metadata.timeCreated,
      };
    },
    [createUploadBlob]
  );

  const optimizePhotoForMirror = useCallback(
    async (photo: ImagePicker.ImageInfo) => {
      const resizeAction =
        Math.max(photo.width, photo.height) > PHOTO_OUTPUT_MAX_DIMENSION
          ? [
              {
                resize:
                  photo.width >= photo.height
                    ? { width: PHOTO_OUTPUT_MAX_DIMENSION }
                    : { height: PHOTO_OUTPUT_MAX_DIMENSION },
              },
            ]
          : [];

      return manipulateAsync(photo.uri, resizeAction, {
        compress: PHOTO_OUTPUT_COMPRESS,
        format: SaveFormat.JPEG,
      });
    },
    []
  );

  const appendLibraryItem = useCallback(
    (media: MirrorLibraryItem) => {
      setStoragePhotos((state) => [media, ...state]);
    },
    [setStoragePhotos]
  );

  const addPhoto = useCallback(async () => {
    if (!user) {
      Alert.alert("로그인이 필요합니다.");
      return;
    }

    if (storagePhotosControl.isPhotoLoading) return;

    setStoragePhotosControl((prev) => ({
      ...prev,
      isChangingMode: false,
      isDeletingMode: false,
      isPhotoLoading: true,
    }));
    openModal({ content: <LoadingModal /> });

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      videoExportPreset: ImagePicker.VideoExportPreset.H264_1280x720,
    });

    if (result.cancelled) {
      setStoragePhotosControl((prev) => ({
        ...prev,
        isPhotoLoading: false,
      }));
      closeModal();
      return;
    }

    try {
      const mediaId = uuidv4();

      if (result.type === "video") {
        const normalizedVideo = await normalizeVideoForMirror(result);
        const posterImage = await generateVideoPosterForMirror(normalizedVideo.uri);
        const storagePath = buildMirrorMediaStoragePath(mediaId, "video");
        const posterStoragePath = buildMirrorPosterStoragePath(mediaId);

        const [{ downloadUrl: posterUrl }, { downloadUrl, createdAt }] =
          await Promise.all([
            uploadMediaFile({
              mediaId,
              type: "image",
              localUri: posterImage.uri,
              storagePath: posterStoragePath,
            }),
            uploadMediaFile({
              mediaId,
              type: "video",
              localUri: normalizedVideo.uri,
              storagePath,
              posterStoragePath,
            }),
          ]);

        appendLibraryItem({
          id: mediaId,
          type: "video",
          src: downloadUrl,
          posterSrc: posterUrl,
          previewSrc: posterUrl,
          mimeType: MIRROR_VIDEO_MIME_TYPE,
          storagePath,
          posterStoragePath,
          createdAt,
        });
      } else {
        const optimizedPhoto = await optimizePhotoForMirror(result);
        const storagePath = buildMirrorMediaStoragePath(mediaId, "image");
        const { downloadUrl, createdAt } = await uploadMediaFile({
          mediaId,
          type: "image",
          localUri: optimizedPhoto.uri,
          storagePath,
        });

        appendLibraryItem({
          id: mediaId,
          type: "image",
          src: downloadUrl,
          posterSrc: null,
          previewSrc: downloadUrl,
          mimeType: MIRROR_IMAGE_MIME_TYPE,
          storagePath,
          posterStoragePath: null,
          createdAt,
        });
      }

      changeModalContent({ content: <FinishModal /> });
    } catch (error) {
      console.log(error);
      Alert.alert("업로드 실패", "미디어를 업로드하지 못했습니다.");
      closeModal();
    } finally {
      setStoragePhotosControl((prev) => ({
        ...prev,
        isPhotoLoading: false,
      }));
    }
  }, [
    appendLibraryItem,
    changeModalContent,
    closeModal,
    openModal,
    optimizePhotoForMirror,
    setStoragePhotosControl,
    storagePhotosControl.isPhotoLoading,
    uploadMediaFile,
    user,
  ]);

  return (
    <S.FirestorePhotosControlsLayout>
      <Button icon="format-list-bulleted" compact mode="text">
        사진({storagePhotosLength})
      </Button>
      <Button compact icon="trash-can-outline" onPress={toggleDeletingMode}>
        <S.ControlerName>삭제</S.ControlerName>
      </Button>
      <Button compact icon="swap-vertical" onPress={toggleChangingMode}>
        <S.ControlerName>변경</S.ControlerName>
      </Button>
      <S.Controler>
        <Button compact icon="plus" onPress={addPhoto}>
          <S.ControlerName>추가</S.ControlerName>
        </Button>
      </S.Controler>
    </S.FirestorePhotosControlsLayout>
  );
};

export default FireStorePhotoControls;

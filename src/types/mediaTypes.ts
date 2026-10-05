export const MIRROR_GALLERY_SCHEMA_VERSION = 2 as const;
export const MIRROR_GALLERY_SLOT_COUNT = 4 as const;

export type MirrorMediaType = "image" | "video";

export interface MirrorMediaItem {
  id: string;
  type: MirrorMediaType;
  src: string;
  posterSrc: string | null;
  mimeType: string;
}

export type MirrorGallerySlot = MirrorMediaItem | null;

export type MirrorGallerySlots = [
  MirrorGallerySlot,
  MirrorGallerySlot,
  MirrorGallerySlot,
  MirrorGallerySlot,
];

export interface MirrorGalleryDoc {
  schemaVersion: typeof MIRROR_GALLERY_SCHEMA_VERSION;
  slots: MirrorGallerySlots;
}

export interface MirrorLibraryItem extends MirrorMediaItem {
  storagePath: string;
  posterStoragePath: string | null;
  previewSrc: string;
  createdAt?: string;
}

export const createEmptyGallerySlots = (): MirrorGallerySlots => [
  null,
  null,
  null,
  null,
];

export const createMirrorGalleryDoc = (
  slots: MirrorGallerySlots = createEmptyGallerySlots()
): MirrorGalleryDoc => ({
  schemaVersion: MIRROR_GALLERY_SCHEMA_VERSION,
  slots,
});

export const getMirrorMediaPreviewSrc = (
  media: Pick<MirrorMediaItem, "type" | "src" | "posterSrc">
) => (media.type === "video" ? media.posterSrc ?? media.src : media.src);

export const toMirrorGallerySlot = (
  media: MirrorLibraryItem
): MirrorMediaItem => ({
  id: media.id,
  type: media.type,
  src: media.src,
  posterSrc: media.posterSrc,
  mimeType: media.mimeType,
});

const isMirrorMediaType = (value: unknown): value is MirrorMediaType =>
  value === "image" || value === "video";

const isMirrorMediaItem = (value: unknown): value is MirrorMediaItem => {
  if (!value || typeof value !== "object") return false;

  const target = value as Record<string, unknown>;

  return (
    typeof target.id === "string" &&
    isMirrorMediaType(target.type) &&
    typeof target.src === "string" &&
    (typeof target.posterSrc === "string" || target.posterSrc === null) &&
    typeof target.mimeType === "string"
  );
};

export const sanitizeMirrorGallerySlots = (
  value: unknown
): MirrorGallerySlots => {
  if (!Array.isArray(value)) {
    return createEmptyGallerySlots();
  }

  const normalized = Array.from({ length: MIRROR_GALLERY_SLOT_COUNT }, (_, index) => {
    const item = value[index];
    return isMirrorMediaItem(item) ? item : null;
  });

  return normalized as MirrorGallerySlots;
};

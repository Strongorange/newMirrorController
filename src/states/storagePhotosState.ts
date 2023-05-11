import { atom, selector } from "recoil";

export interface StoragePhoto {
  id?: string;
  path: string;
  uri: string;
  createdAt?: string;
}

export const storagePhotosState = atom<StoragePhoto[]>({
  key: "storagePhotosState",
  default: [],
});

export const storagePhotosCountSelctor = selector({
  key: "storagePhotosCountSelector",
  get: ({ get }) => {
    const storagePhotos = get(storagePhotosState);
    return storagePhotos.length;
  },
});

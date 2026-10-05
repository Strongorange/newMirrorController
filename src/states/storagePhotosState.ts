import { atom, selector } from "recoil";
import { MirrorLibraryItem } from "../types/mediaTypes";

export const storagePhotosState = atom<MirrorLibraryItem[]>({
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

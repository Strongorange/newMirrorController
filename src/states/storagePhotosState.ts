import { atom, selector } from "recoil";
import ReactNativeRecoilPersist from "react-native-recoil-persist";

export interface StoragePhoto {
  id?: string;
  path: string;
  uri: string;
  createdAt?: string;
}

export const storagePhotosState = atom<StoragePhoto[]>({
  key: "storagePhotosState",
  default: [],
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

export const storagePhotosCountSelctor = selector({
  key: "storagePhotosCountSelector",
  get: ({ get }) => {
    const storagePhotos = get(storagePhotosState);
    return storagePhotos.length;
  },
});

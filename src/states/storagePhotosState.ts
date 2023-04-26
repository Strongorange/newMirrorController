import { atom } from "recoil";
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

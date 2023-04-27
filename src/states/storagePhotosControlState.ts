import { atom } from "recoil";

interface StoragePhotosControlState {
  isDeletingMode: boolean;
  isChangingMode: boolean;
  isModalVisible: boolean;
}

export const storagePhotosControlState = atom<StoragePhotosControlState>({
  key: "storagePhotosControlState",
  default: {
    isDeletingMode: false,
    isChangingMode: false,
    isModalVisible: false,
  },
});

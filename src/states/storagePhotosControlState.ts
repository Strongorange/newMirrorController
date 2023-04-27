import { atom } from "recoil";

interface StoragePhotosControlState {
  isDeletingMode: boolean;
  isChangingMode: boolean;
  isModalVisible: boolean;
  modalContent?: JSX.Element | string;
}

export const storagePhotosControlState = atom<StoragePhotosControlState>({
  key: "storagePhotosControlState",
  default: {
    isDeletingMode: false,
    isChangingMode: false,
    isModalVisible: false,
  },
});

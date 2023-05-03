import { atom } from "recoil";

interface StoragePhotosControlState {
  isDeletingMode: boolean;
  isChangingMode: boolean;
  isModalVisible: boolean;
  modalContent?: JSX.Element | string;
  isPhotoLoading: boolean;
}

export const storagePhotosControlState = atom<StoragePhotosControlState>({
  key: "storagePhotosControlState",
  default: {
    isDeletingMode: false,
    isChangingMode: false,
    isModalVisible: false,
    isPhotoLoading: false,
  },
});

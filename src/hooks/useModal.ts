import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { storagePhotosControlState } from "../states/storagePhotosControlState";

interface OpenModalProps {
  content: JSX.Element;
}

export const useModal = () => {
  const [storagePhotosControl, setStoragePhotosControl] = useRecoilState(
    storagePhotosControlState
  );

  const closeModal = useCallback(() => {
    setStoragePhotosControl((prev) => ({
      ...prev,
      isModalVisible: false,
    }));
  }, [setStoragePhotosControl]);

  const openModal = useCallback(
    ({ content }: OpenModalProps) => {
      setStoragePhotosControl((prev) => ({
        ...prev,
        isModalVisible: true,
        modalContent: content,
      }));
    },
    [setStoragePhotosControl]
  );

  const changeModalContent = useCallback(({ content }: OpenModalProps) => {
    setStoragePhotosControl((prev) => ({
      ...prev,
      modalContent: content,
    }));
  }, []);

  return { storagePhotosControl, closeModal, openModal, changeModalContent };
};

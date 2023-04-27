import { Alert } from "react-native";
import React, { useCallback } from "react";
import * as S from "../../styles/home/DeletePhotoModalContent.style";
import {
  StoragePhoto,
  storagePhotosState,
} from "../../states/storagePhotosState";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { useModal } from "../../hooks/useModal";

interface DeletePhotoModalContentProps {
  item: StoragePhoto;
}

const DeletePhotoModalContent = ({ item }: DeletePhotoModalContentProps) => {
  const [storagePhotos, setStoragePhotos] = useRecoilState(storagePhotosState);
  const { closeModal } = useModal();

  const deletePhoto = useCallback(async () => {
    try {
      const storage = getStorage();
      const delRef = ref(storage, item.path);
      await deleteObject(delRef);
      const currentStoragePhotos = [...storagePhotos];
      const newStoragePhotos = currentStoragePhotos.filter((current) => {
        return current.path !== item.path;
      });
      setStoragePhotos(newStoragePhotos);
    } catch (error) {
      console.log(error);
    } finally {
      Alert.alert("삭제되었습니다.");
      closeModal();
    }
  }, [item]);

  return (
    <S.DeletePhotoModalLayout>
      <S.Image source={{ uri: item.uri }} />
      <S.ButtonContainer>
        <S.Button
          icon="trash-can-outline"
          mode="contained-tonal"
          onPress={deletePhoto}
        >
          삭제
        </S.Button>
        <S.Button icon="cancel" mode="contained-tonal" onPress={closeModal}>
          취소
        </S.Button>
      </S.ButtonContainer>
    </S.DeletePhotoModalLayout>
  );
};

export default DeletePhotoModalContent;

import { Alert } from "react-native";
import React, { useCallback } from "react";
import * as S from "../../styles/home/DeletePhotoModalContent.style";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { useModal } from "../../hooks/useModal";
import { storagePhotosState } from "../../states/storagePhotosState";
import { showingPhotosState } from "../../states/showingPhotosState";
import {
  createMirrorGalleryDoc,
  getMirrorMediaPreviewSrc,
  MirrorLibraryItem,
} from "../../types/mediaTypes";
import { saveMirrorGalleryDoc } from "../../utils/mirrorMedia";

interface DeletePhotoModalContentProps {
  item: MirrorLibraryItem;
}

const DeletePhotoModalContent = ({ item }: DeletePhotoModalContentProps) => {
  const [storagePhotos, setStoragePhotos] = useRecoilState(storagePhotosState);
  const [showingPhotos, setShowingPhotos] = useRecoilState(showingPhotosState);
  const { closeModal } = useModal();

  const deletePhoto = useCallback(async () => {
    try {
      const storage = getStorage();
      const delRef = ref(storage, item.storagePath);
      await deleteObject(delRef);
      if (item.posterStoragePath) {
        await deleteObject(ref(storage, item.posterStoragePath));
      }
      const currentStoragePhotos = [...storagePhotos];
      const newStoragePhotos = currentStoragePhotos.filter((current) => {
        return current.storagePath !== item.storagePath;
      });
      setStoragePhotos(newStoragePhotos);

      const nextShowingPhotos = showingPhotos.map((current) =>
        current?.id === item.id ? null : current
      ) as typeof showingPhotos;

      if (
        nextShowingPhotos.some((current, index) => current !== showingPhotos[index])
      ) {
        await saveMirrorGalleryDoc(createMirrorGalleryDoc(nextShowingPhotos));
        setShowingPhotos(nextShowingPhotos);
      }

      Alert.alert("삭제되었습니다.");
    } catch (error) {
      console.log(error);
      Alert.alert("삭제 실패", "사진 삭제를 완료하지 못했습니다.");
      return;
    } finally {
      closeModal();
    }
  }, [closeModal, item, setShowingPhotos, setStoragePhotos, showingPhotos, storagePhotos]);

  return (
    <S.DeletePhotoModalLayout>
      <S.Image source={{ uri: getMirrorMediaPreviewSrc(item) }} />
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

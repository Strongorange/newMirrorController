import { Alert } from "react-native";
import React from "react";
import * as S from "../../styles/home/SwitchPhotoModalContent.style";
import { showingPhotosState } from "../../states/showingPhotosState";
import { useRecoilState, useRecoilValue } from "recoil";
import { storagePhotosControlState } from "../../states/storagePhotosControlState";
import { userState } from "../../states/authState";
import { useNavigation } from "@react-navigation/native";
import {
  createMirrorGalleryDoc,
  getMirrorMediaPreviewSrc,
  MirrorGallerySlots,
  MirrorLibraryItem,
  toMirrorGallerySlot,
} from "../../types/mediaTypes";
import { saveMirrorGalleryDoc } from "../../utils/mirrorMedia";

interface SwitchPhotoModalContentProps {
  item: MirrorLibraryItem;
}

const SwitchPhotoModalContent = ({ item }: SwitchPhotoModalContentProps) => {
  const user = useRecoilValue(userState);
  const navigation = useNavigation();
  const [showingPhotos, setShowingPhotos] = useRecoilState(showingPhotosState);
  const [storagePhotosControl, setStoragePhotosControl] = useRecoilState(
    storagePhotosControlState
  );

  const changeShowingPhoto = async (index: number) => {
    if (user) {
      try {
        setStoragePhotosControl((prev) => ({
          ...prev,
          isPhotoLoading: true,
        }));
        const currentPhotoArr = [...showingPhotos];
        currentPhotoArr[index] = toMirrorGallerySlot(item);
        const nextGalleryDoc = createMirrorGalleryDoc(
          currentPhotoArr as MirrorGallerySlots
        );
        await saveMirrorGalleryDoc(nextGalleryDoc);
        setShowingPhotos(nextGalleryDoc.slots);
        Alert.alert("변경 완료", "사진이 변경되었습니다.");
      } catch (error) {
        console.log(error);
        Alert.alert("변경 실패", "사진 변경 내용을 저장하지 못했습니다.");
      } finally {
        setStoragePhotosControl((prev) => ({
          ...prev,
          isPhotoLoading: false,
          isChangingMode: false,
          isModalVisible: false,
        }));
      }
    } else {
      Alert.alert("로그인이 필요합니다.", "로그인 페이지로 이동합니다.");
      //@ts-ignore
      navigation.navigate("AuthStack", { screen: "Login" });
    }
  };

  return (
    <S.SwitchPhotoModalLayout>
      <S.Element>
        {showingPhotos[0] ? (
          <S.Image source={{ uri: getMirrorMediaPreviewSrc(showingPhotos[0]) }} />
        ) : (
          <S.ImagePlaceholder />
        )}
        <S.Button mode="contained-tonal" onPress={() => changeShowingPhoto(0)}>
          첫번째
        </S.Button>
      </S.Element>
      <S.Element>
        {showingPhotos[1] ? (
          <S.Image source={{ uri: getMirrorMediaPreviewSrc(showingPhotos[1]) }} />
        ) : (
          <S.ImagePlaceholder />
        )}
        <S.Button mode="contained-tonal" onPress={() => changeShowingPhoto(1)}>
          두번째
        </S.Button>
      </S.Element>
      <S.Element>
        {showingPhotos[2] ? (
          <S.Image source={{ uri: getMirrorMediaPreviewSrc(showingPhotos[2]) }} />
        ) : (
          <S.ImagePlaceholder />
        )}
        <S.Button mode="contained-tonal" onPress={() => changeShowingPhoto(2)}>
          세번째
        </S.Button>
      </S.Element>
      <S.Element>
        {showingPhotos[3] ? (
          <S.Image source={{ uri: getMirrorMediaPreviewSrc(showingPhotos[3]) }} />
        ) : (
          <S.ImagePlaceholder />
        )}
        <S.Button mode="contained-tonal" onPress={() => changeShowingPhoto(3)}>
          네번째
        </S.Button>
      </S.Element>
    </S.SwitchPhotoModalLayout>
  );
};

export default SwitchPhotoModalContent;

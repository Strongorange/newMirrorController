import { Alert } from "react-native";
import React from "react";
import * as S from "../../styles/home/SwitchPhotoModalContent.style";
import { StoragePhoto } from "../../states/storagePhotosState";
import { showingPhotosState } from "../../states/showingPhotosState";
import { useRecoilState, useRecoilValue } from "recoil";
import { storagePhotosControlState } from "../../states/storagePhotosControlState";
import firestore from "@react-native-firebase/firestore";
import { userState } from "../../states/authState";

interface SwitchPhotoModalContentProps {
  item: StoragePhoto;
}

const SwitchPhotoModalContent = ({ item }: SwitchPhotoModalContentProps) => {
  const user = useRecoilValue(userState);
  const [showingPhotos, setShowingPhotos] = useRecoilState(showingPhotosState);
  const [storagePhotosControl, setStoragePhotosControl] = useRecoilState(
    storagePhotosControlState
  );

  const changeShowingPhoto = async (index: number) => {
    try {
      setStoragePhotosControl((prev) => ({
        ...prev,
        isPhotoLoading: true,
      }));
      const currentPhotoArr = [...showingPhotos];
      currentPhotoArr[index] = item.uri;
      setShowingPhotos(currentPhotoArr);
      await firestore()
        .collection(user ? user.uid : "mirror")
        .doc("gallery")
        .set({
          photos: currentPhotoArr,
        });
      Alert.alert("변경 완료", "사진이 변경되었습니다.");
    } catch (error) {
      console.log(error);
    } finally {
      setStoragePhotosControl((prev) => ({
        ...prev,
        isPhotoLoading: false,
        isChangingMode: false,
        isModalVisible: false,
      }));
    }
  };

  return (
    <S.SwitchPhotoModalLayout>
      <S.Element>
        <S.Image source={{ uri: showingPhotos[0] }} />
        <S.Button mode="contained-tonal" onPress={() => changeShowingPhoto(0)}>
          첫번째
        </S.Button>
      </S.Element>
      <S.Element>
        <S.Image source={{ uri: showingPhotos[1] }} />
        <S.Button mode="contained-tonal" onPress={() => changeShowingPhoto(1)}>
          두번째
        </S.Button>
      </S.Element>
      <S.Element>
        <S.Image source={{ uri: showingPhotos[2] }} />
        <S.Button mode="contained-tonal" onPress={() => changeShowingPhoto(2)}>
          세번째
        </S.Button>
      </S.Element>
      <S.Element>
        <S.Image source={{ uri: showingPhotos[3] }} />
        <S.Button mode="contained-tonal" onPress={() => changeShowingPhoto(3)}>
          네번째
        </S.Button>
      </S.Element>
    </S.SwitchPhotoModalLayout>
  );
};

export default SwitchPhotoModalContent;

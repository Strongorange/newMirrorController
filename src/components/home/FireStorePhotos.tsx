import { View, Text } from "react-native";
import React from "react";
import * as S from "../../styles/home/FirestorePhotos.style";
import { useRecoilState } from "recoil";
import {
  StoragePhoto,
  storagePhotosState,
} from "../../states/storagePhotosState";

const FireStorePhotos = () => {
  const [storagePhotos] = useRecoilState(storagePhotosState);

  const renderItem = (props: any) => {
    console.log(props);
    return (
      <View>
        <Text>wow</Text>
      </View>
    );
  };

  return (
    <S.FirestorePhotosLayout key={"wow"}>
      <S.ControlersBox>
        <S.ControlerName>저장된 사진(x)</S.ControlerName>
        <S.ControlerName>수정</S.ControlerName>
        <S.ControlerName>현재 사진 변경</S.ControlerName>
        <S.ControlerName>사진 추가</S.ControlerName>
      </S.ControlersBox>

      <S.ImageFlatList
        data={storagePhotos}
        renderItem={renderItem}
        keyExtractor={(item: StoragePhoto, index: number) => item.id}
      />
    </S.FirestorePhotosLayout>
  );
};

export default FireStorePhotos;

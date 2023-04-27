import React from "react";
import { FlatList, ListRenderItem } from "react-native";
import FastImage from "react-native-fast-image";
import { useRecoilState } from "recoil";
import { showingPhotosState } from "../../states/showingPhotosState";
import * as S from "../../styles/home/CurrentPhotos.style";

const CurrentPhotos = () => {
  const [showingPhoto] = useRecoilState(showingPhotosState);

  const renderItem: ListRenderItem<string> = ({ item }) => (
    <S.Image source={{ uri: item }} />
  );

  return (
    <S.CurrentPhotoContainer>
      <S.CurrentPhotoTitle>현재</S.CurrentPhotoTitle>
      <FlatList data={showingPhoto} horizontal renderItem={renderItem} />
    </S.CurrentPhotoContainer>
  );
};

export default CurrentPhotos;

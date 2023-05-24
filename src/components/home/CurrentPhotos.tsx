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
      {showingPhoto.length === 0 ? (
        <S.NoCurrentPhotos>
          <S.NoCurrentPhotosText>
            거울에 보일 사진을 등록해주세요!
          </S.NoCurrentPhotosText>
        </S.NoCurrentPhotos>
      ) : (
        <FlatList data={showingPhoto} horizontal renderItem={renderItem} />
      )}
    </S.CurrentPhotoContainer>
  );
};

export default CurrentPhotos;

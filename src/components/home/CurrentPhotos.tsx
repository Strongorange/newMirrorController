import React from "react";
import { FlatList, ListRenderItem } from "react-native";
import { useRecoilValue } from "recoil";
import { showingPhotosState } from "../../states/showingPhotosState";
import {
  getMirrorMediaPreviewSrc,
  MirrorMediaItem,
} from "../../types/mediaTypes";
import * as S from "../../styles/home/CurrentPhotos.style";

const CurrentPhotos = () => {
  const showingPhoto = useRecoilValue(showingPhotosState);
  const showingMedia = showingPhoto.filter(
    (item): item is MirrorMediaItem => item !== null
  );

  const renderItem: ListRenderItem<MirrorMediaItem> = ({ item }) => (
    <S.ImageWrapper>
      <S.Image source={{ uri: getMirrorMediaPreviewSrc(item) }} />
      {item.type === "video" ? <S.VideoBadge>VIDEO</S.VideoBadge> : null}
    </S.ImageWrapper>
  );

  return (
    <S.CurrentPhotoContainer>
      <S.CurrentPhotoTitle>현재</S.CurrentPhotoTitle>
      {showingMedia.length === 0 ? (
        <S.NoCurrentPhotos>
          <S.NoCurrentPhotosText>
            거울에 보일 사진을 등록해주세요!
          </S.NoCurrentPhotosText>
        </S.NoCurrentPhotos>
      ) : (
        <FlatList data={showingMedia} horizontal renderItem={renderItem} />
      )}
    </S.CurrentPhotoContainer>
  );
};

export default CurrentPhotos;

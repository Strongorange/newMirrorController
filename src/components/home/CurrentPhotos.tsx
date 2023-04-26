import React from "react";
import { useRecoilState } from "recoil";
import { showingPhotosState } from "../../states/showingPhotosState";
import * as S from "../../styles/home/CurrentPhotos.style";

const CurrentPhotos = () => {
  const [showingPhoto, setShowingPhoto] = useRecoilState(showingPhotosState);

  return (
    <S.CurrentPhotoContainer>
      <S.CurrentPhotoTitle>현재</S.CurrentPhotoTitle>
      <S.TempView horizontal>
        {showingPhoto.map((photo, index) => (
          <S.Image key={index} source={{ uri: photo }} />
        ))}
      </S.TempView>
    </S.CurrentPhotoContainer>
  );
};

export default CurrentPhotos;

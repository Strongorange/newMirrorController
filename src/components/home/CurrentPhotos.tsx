import React from "react";
import * as S from "../../styles/home/CurrentPhotos.style";

interface ShowingPhoto {
  //
}

const CurrentPhotos = () => {
  return (
    <S.CurrentPhotoContainer>
      <S.CurrentPhotoTitle>현재</S.CurrentPhotoTitle>
      {/* <S.CurrentPhotoSlider></S.CurrentPhotoSlider> */}
    </S.CurrentPhotoContainer>
  );
};

export default CurrentPhotos;

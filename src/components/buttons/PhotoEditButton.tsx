import React from "react";
import { useRecoilValue } from "recoil";
import { storagePhotosControlState } from "../../states/storagePhotosControlState";
import * as S from "../../styles/buttons/PhotoEditButton.style";

type PhotoEditButtonProps = {
  variant: "delete" | "change";
  compact?: boolean;
  visible: boolean;
};

const PhotoEditButton = ({
  variant,
  compact,
  visible,
}: PhotoEditButtonProps) => {
  const storagePhotosControl = useRecoilValue(storagePhotosControlState);
  const textContent = variant === "change" ? "선택" : "삭제";
  const buttonColor = variant === "change" ? "green" : "red";

  if (!visible) return null;

  return (
    <S.PhotoEditButton compact={compact} buttonColor={buttonColor}>
      <S.Text>{textContent}</S.Text>
    </S.PhotoEditButton>
  );
};

export default PhotoEditButton;

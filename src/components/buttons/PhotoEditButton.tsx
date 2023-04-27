import React from "react";
import { useModal } from "../../hooks/useModal";
import { StoragePhoto } from "../../states/storagePhotosState";
import * as S from "../../styles/buttons/PhotoEditButton.style";
import SwitchPhotoModalContent from "../home/SwitchPhotoModalContent";

type PhotoEditButtonProps = {
  variant: "delete" | "change";
  compact?: boolean;
  visible: boolean;
  item: StoragePhoto;
};

const PhotoEditButton = ({
  variant,
  compact,
  visible,
  item,
}: PhotoEditButtonProps) => {
  const { openModal } = useModal();
  const textContent = variant === "change" ? "선택" : "삭제";
  const buttonColor = variant === "change" ? "green" : "red";

  if (!visible) return null;

  return (
    <S.PhotoEditButton
      compact={compact}
      buttonColor={buttonColor}
      onPress={() =>
        openModal({ content: <SwitchPhotoModalContent item={item} /> })
      }
    >
      <S.Text>{textContent}</S.Text>
    </S.PhotoEditButton>
  );
};

export default PhotoEditButton;

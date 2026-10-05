import React from "react";
import { useModal } from "../../hooks/useModal";
import * as S from "../../styles/buttons/PhotoEditButton.style";
import DeletePhotoModalContent from "../home/DeletePhotoModalContent";
import SwitchPhotoModalContent from "../home/SwitchPhotoModalContent";
import { MirrorLibraryItem } from "../../types/mediaTypes";

type PhotoEditButtonProps = {
  variant: "delete" | "change";
  compact?: boolean;
  visible: boolean;
  item: MirrorLibraryItem;
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
        openModal({
          content:
            variant === "change" ? (
              <SwitchPhotoModalContent item={item} />
            ) : (
              <DeletePhotoModalContent item={item} />
            ),
        })
      }
    >
      <S.Text>{textContent}</S.Text>
    </S.PhotoEditButton>
  );
};

export default PhotoEditButton;

import React, { useCallback } from "react";
import * as S from "../../styles/home/FirestorePhotosControls.style";
import { useRecoilState, useRecoilValue } from "recoil";
import { storagePhotosControlState } from "../../states/storagePhotosControlState";
import { storagePhotosCountSelctor } from "../../states/storagePhotosState";
import { Button } from "react-native-paper";

const FireStorePhotoControls = () => {
  const [storagePhotosControl, setStoragePhotosControl] = useRecoilState(
    storagePhotosControlState
  );
  // Recoil Selctor를 사용해 받은 현재 fb의 사진 길이
  const storagePhotosLength = useRecoilValue(storagePhotosCountSelctor);

  const toggleChangingMode = useCallback(() => {
    setStoragePhotosControl((prev) => ({
      ...prev,
      isChangingMode: !prev.isChangingMode,
    }));
  }, []);

  return (
    <>
      <S.FirestorePhotosControlsLayout>
        <Button icon="format-list-bulleted" compact mode="text">
          사진({storagePhotosLength})
        </Button>
        <Button compact icon="trash-can-outline">
          <S.ControlerName>삭제</S.ControlerName>
        </Button>
        <Button compact icon="swap-vertical" onPress={toggleChangingMode}>
          <S.ControlerName>변경</S.ControlerName>
        </Button>
        <S.Controler>
          <Button compact icon="plus">
            <S.ControlerName>추가</S.ControlerName>
          </Button>
        </S.Controler>
      </S.FirestorePhotosControlsLayout>
    </>
  );
};

export default FireStorePhotoControls;

import { ListRenderItem } from "react-native";
import React, { useCallback } from "react";
import * as S from "../../styles/home/FirestorePhotos.style";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  StoragePhoto,
  storagePhotosState,
} from "../../states/storagePhotosState";
import { storagePhotosControlState } from "../../states/storagePhotosControlState";
import PhotoEditButton from "../buttons/PhotoEditButton";

const FireStorePhotos = () => {
  const [storagePhotos] = useRecoilState(storagePhotosState);
  const storagePhotosControl = useRecoilValue(storagePhotosControlState);

  // 컴포넌트가 렌더링 될 때마다 새로운 함수 생성 방지
  const keyExtractor = useCallback((item: StoragePhoto) => String(item.id), []);
  // storagePhtosControl.isChangingMode가 바뀔때는 함수를 새로 생성해야 정상적으로 동작
  const renderItem = useCallback<ListRenderItem<StoragePhoto>>(
    ({ item }) => {
      return (
        <S.ImageContainer>
          <PhotoEditButton
            variant="change"
            visible={storagePhotosControl.isChangingMode}
          />
          <S.Image key={item.id} source={{ uri: item.uri }} />
        </S.ImageContainer>
      );
    },
    [storagePhotosControl.isChangingMode]
  );

  return (
    <S.FirestorePhotosLayout key={"wow"}>
      <S.FlatListContainer>
        <S.ImageFlatList
          data={storagePhotos}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={2}
          initialNumToRender={8}
          windowSize={12}
          removeClippedSubviews
        />
      </S.FlatListContainer>
    </S.FirestorePhotosLayout>
  );
};

export default FireStorePhotos;

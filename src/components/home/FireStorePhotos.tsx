import { ListRenderItem } from "react-native";
import React, { useCallback } from "react";
import * as S from "../../styles/home/FirestorePhotos.style";
import { useRecoilState } from "recoil";
import {
  StoragePhoto,
  storagePhotosState,
} from "../../states/storagePhotosState";

const FireStorePhotos = () => {
  const [storagePhotos] = useRecoilState(storagePhotosState);

  // 컴포넌트가 렌더링 될 때마다 새로운 함수 생성 방지
  const keyExtractor = useCallback((item: StoragePhoto) => String(item.id), []);
  const renderItem = useCallback<ListRenderItem<StoragePhoto>>(({ item }) => {
    console.log("item", item);
    return (
      <S.ImageContainer>
        <S.Image key={item.id} source={{ uri: item.uri }} />
      </S.ImageContainer>
    );
  }, []);

  return (
    <S.FirestorePhotosLayout key={"wow"}>
      <S.ControlersBox>
        <S.ControlerName>저장된 사진(x)</S.ControlerName>
        <S.ControlerName>수정</S.ControlerName>
        <S.ControlerName>현재 사진 변경</S.ControlerName>
        <S.ControlerName>사진 추가</S.ControlerName>
      </S.ControlersBox>
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

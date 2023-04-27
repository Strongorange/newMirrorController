import React, { useCallback } from "react";
import * as S from "../../styles/home/FirestorePhotosControls.style";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { storagePhotosControlState } from "../../states/storagePhotosControlState";
import { storagePhotosCountSelctor } from "../../states/storagePhotosState";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { FFmpegKit } from "ffmpeg-kit-react-native";
import * as RNFS from "react-native-fs";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { uuidv4 } from "@firebase/util";
import { storagePhotosState } from "../../states/storagePhotosState";

const FireStorePhotoControls = () => {
  const [storagePhotosControl, setStoragePhotosControl] = useRecoilState(
    storagePhotosControlState
  );
  const setStoragePhotos = useSetRecoilState(storagePhotosState);
  // Recoil Selctor를 사용해 받은 현재 fb의 사진 길이
  const storagePhotosLength = useRecoilValue(storagePhotosCountSelctor);

  const toggleChangingMode = useCallback(() => {
    setStoragePhotosControl((prev) => ({
      ...prev,
      isChangingMode: !prev.isChangingMode,
      isDeletingMode: false,
    }));
  }, [
    storagePhotosControl.isChangingMode,
    storagePhotosControl.isDeletingMode,
    setStoragePhotosControl,
  ]);

  const toggleDeletingMode = useCallback(() => {
    setStoragePhotosControl((prev) => ({
      ...prev,
      isDeletingMode: !prev.isDeletingMode,
      isChangingMode: false,
    }));
  }, [
    storagePhotosControl.isChangingMode,
    storagePhotosControl.isDeletingMode,
    setStoragePhotosControl,
  ]);

  const uploadToFirebase = useCallback(
    async (imagePath: string, isVideo: boolean) => {
      console.log(`xhr 의 imagePath = ${imagePath}`);
      try {
        const blob: Blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          if (isVideo) {
            xhr.open("GET", `file://${imagePath}`, true);
          } else {
            xhr.open("GET", String(imagePath), true);
          }
          xhr.send(null);
        });

        const storage = getStorage();
        const fileRef: any = ref(storage, uuidv4());

        const storagePath = fileRef._location.path;
        const result2 = await uploadBytes(fileRef, blob);
        const createdTime = result2.metadata.timeCreated;
        const downloadUrl = await getDownloadURL(fileRef);

        setStoragePhotos((state) => [
          ...state,
          { uri: downloadUrl, path: storagePath, createdAt: createdTime },
        ]);
        console.log("업로드 끝");
      } catch (error) {
        console.log("xhr 에러");
        console.log(error);
      }
    },
    []
  );

  const addPhoto = useCallback(async () => {
    setStoragePhotosControl((prev) => ({
      ...prev,
      isChangingMode: false,
      isDeletingMode: false,
    }));

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [1, 1],
    });

    /**
     * @description 비디오를 gif로 변환
     */
    if (!result.cancelled) {
      if (result.type === "video") {
        // GIF 변환
        await FFmpegKit.execute(
          `-i ${result.uri} -y -vf scale=160:-1 -loop 0 ${RNFS.DocumentDirectoryPath}/animation.gif`
        );
        const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
        const animationGifIndex = files.findIndex(
          (file) => file.name === "animation.gif"
        );
        if (animationGifIndex !== -1) {
          uploadToFirebase(files[animationGifIndex].path, true);
        } else {
          console.error("animation.gif 파일을 찾을 수 없습니다.");
        }
      } else {
        uploadToFirebase(result.uri, false);
      }
    }
  }, []);

  return (
    <>
      <S.FirestorePhotosControlsLayout>
        <Button icon="format-list-bulleted" compact mode="text">
          사진({storagePhotosLength})
        </Button>
        <Button compact icon="trash-can-outline" onPress={toggleDeletingMode}>
          <S.ControlerName>삭제</S.ControlerName>
        </Button>
        <Button compact icon="swap-vertical" onPress={toggleChangingMode}>
          <S.ControlerName>변경</S.ControlerName>
        </Button>
        <S.Controler>
          <Button compact icon="plus" onPress={addPhoto}>
            <S.ControlerName>추가</S.ControlerName>
          </Button>
        </S.Controler>
      </S.FirestorePhotosControlsLayout>
    </>
  );
};

export default FireStorePhotoControls;

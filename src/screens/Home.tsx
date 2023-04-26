import styled from "styled-components/native";
import React, { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  deleteObject,
  uploadBytes,
} from "firebase/storage";
import { Dimensions, Alert, Button, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import uuid from "uuid";
import { BG_COLOR } from "../../theme";
import { StatusBar } from "expo-status-bar";
import { FFmpegKit } from "ffmpeg-kit-react-native";
import * as RNFS from "react-native-fs";
import * as SplashScreen from "expo-splash-screen";
import FastImage from "react-native-fast-image";
import Modal from "react-native-modal";
import {
  FB_API_KEY,
  FB_APP_ID,
  FB_AUTH_DOMAIN,
  FB_MESSAGING_SENDER_ID,
  FB_PROJECT_ID,
  FB_STORAGE_BUCKET,
} from "@env";
import * as S from "../styles/home.style";
import CurrentPhotos from "../components/home/CurrentPhotos";
import { useRecoilState } from "recoil";
import { showingPhotosState } from "../states/showingPhotosState";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FB_API_KEY,
  authDomain: FB_AUTH_DOMAIN,
  projectId: FB_PROJECT_ID,
  storageBucket: FB_STORAGE_BUCKET,
  messagingSenderId: FB_MESSAGING_SENDER_ID,
  appId: FB_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

const storage = getStorage();

const listRef = ref(storage, "/");

const Home = () => {
  const [showingPhotosAtom, setShowingPhotosAtom] =
    useRecoilState(showingPhotosState);
  const [photosArr, setPhotosArr] = useState<any[]>([]);
  const [storagePhotos, setStoragePhotos] = useState<any[]>([]);
  const [schedules, setSchedules] = useState([]);
  const [currentFbPhotosLen, setCurrentFbPhotoLen] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any>({});

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const changeShowingPhoto = (index: number) => {
    try {
      setIsLoading(true);
      const currentPhotoArr: any[] = [...photosArr];
      currentPhotoArr[index] = selectedPhoto.uri;
      setPhotosArr(currentPhotoArr);
      setShowingPhotosAtom(currentPhotoArr);
      firestore().collection("mirror").doc("gallery").set({
        photos: currentPhotoArr,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsChange(false);
    }

    closeModal();
  };

  function onResultPhoto(QuerySnapshot: any) {
    setShowingPhotosAtom(QuerySnapshot.data().photos);
  }

  function onResultSchedule(QuerySnapshot: any) {
    //console.log(QuerySnapshot._data);
  }

  function onError(error: any) {
    console.error(error);
  }

  const uploadToFirebase = async (imagePath: string, isVideo: boolean) => {
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

      const fileRef: any = ref(storage, uuid.v4());

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
    } finally {
      setIsLoading((state) => false);
    }
  };

  useEffect(() => {
    try {
      setIsInitialLoading(true);
      firestore()
        .collection("mirror")
        .doc("gallery")
        .onSnapshot(onResultPhoto, onError);

      firestore()
        .collection("mirror")
        .doc("schedules")
        .onSnapshot(onResultSchedule, onError);

      listAll(listRef)
        .then((res) => {
          setCurrentFbPhotoLen(res.items.length);
          res.items.forEach((itemRef) => {
            const reference: any = ref(storage, itemRef.fullPath);
            getDownloadURL(reference).then((res) => {
              // 이미지 객체에 id 속성 추가
              const newImage = {
                uri: res,
                path: reference._location.path,
                id: reference._location.path,
              };

              // 이미지가 storagePhotos에 있는지 확인
              const isImageExist = storagePhotos.some(
                (image) => image.id === newImage.id
              );

              // 중복되지 않은 경우에만 추가
              if (!isImageExist) {
                setStoragePhotos((state) => [...state, newImage]);
              }
            });
          });
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setIsInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };

    if (!isInitialLoading) {
      setTimeout(hideSplash, 1500);
    }
  }, [isInitialLoading]);

  const renderItem = ({ item }: any) => {
    return isEdit ? (
      <>
        <S.ImageView>
          {/* <Image source={{ uri: `${item.uri}` }} /> */}
          <FastImage source={{ uri: `${item.uri}` }} />
          <S.DeleteBtn
            onPress={() => {
              Alert.alert("경고", "정말 지우려구?", [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => {
                    console.log("OK Pressed");
                    console.log(item.path);
                    const delRef = ref(storage, item.path);
                    deleteObject(delRef)
                      .then(() => {
                        setStoragePhotos((state) =>
                          state.filter((current) => {
                            return current.path !== item.path;
                          })
                        );
                        console.log("삭제됨");
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  },
                },
              ]);
            }}
          >
            <S.Text>삭제</S.Text>
          </S.DeleteBtn>
          <S.PhotoName>{item.path.slice(0, 10)}...</S.PhotoName>
        </S.ImageView>
      </>
    ) : isChange ? (
      <>
        <S.ImageView>
          <S.Image source={{ uri: `${item.uri}` }} />
          <S.SelectBtn
            onPress={() => {
              setSelectedPhoto(item);
              openModal();
            }}
          >
            <S.Text>선택</S.Text>
          </S.SelectBtn>
        </S.ImageView>
      </>
    ) : (
      <S.Image source={{ uri: `${item.uri}` }} />
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 0,
    });

    console.log("선택된 미디어 \n");
    console.log(result);

    /**
     * @description 비디오를 gif로 변환
     */
    if (!result.cancelled) {
      if (result.type === "video") {
        console.log("비디오 선택됨");
        const createdGif = await FFmpegKit.execute(
          `-i ${result.uri} -y -vf scale=160:-1 -loop 0 ${RNFS.DocumentDirectoryPath}/animation.gif`
        );
        const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
        console.log("파일 목록 \n");
        console.log(files);

        const animationGifIndex = files.findIndex(
          (file) => file.name === "animation.gif"
        );
        if (animationGifIndex !== -1) {
          setImage(files[animationGifIndex].path);
          uploadToFirebase(files[animationGifIndex].path, true);
        } else {
          console.error("animation.gif 파일을 찾을 수 없습니다.");
        }
      } else {
        setImage(result.uri);
        uploadToFirebase(result.uri, false);
      }
    } else {
      console.log("취소됨");
    }
  };

  return isInitialLoading ? (
    <S.HomeLayout>
      <S.Text>노루를 데려오는 중</S.Text>
    </S.HomeLayout>
  ) : (
    <S.HomeLayout>
      <S.CurrentPhotoContainer>
        <CurrentPhotos />
        <S.Text>현재</S.Text>
      </S.CurrentPhotoContainer>
      <S.View2>
        <S.HView>
          <S.Text>저장된 사진 ({storagePhotos.length})</S.Text>
          <S.EditBtn onPress={() => setIsEdit((state) => !state)}>
            <S.Text>수정</S.Text>
          </S.EditBtn>
          <S.EditBtn onPress={() => setIsChange((state) => !state)}>
            <S.Text>현재 사진 변경 </S.Text>
          </S.EditBtn>
          <S.AddBtn onPress={() => pickImage()}>
            <S.Text>사진추가</S.Text>
          </S.AddBtn>
        </S.HView>

        {!isLoading && storagePhotos.length > 0 ? (
          <S.StorageImageView
            keyExtractor={(item: any) => item.path}
            data={storagePhotos}
            renderItem={renderItem}
            horizontal={false}
            numColumns={3}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            ItemSeparatorComponent={S.Separator}
          />
        ) : (
          <S.Text>노루를 데려오는 중</S.Text>
        )}
      </S.View2>
      <StatusBar />
      <Modal isVisible={modalVisible}>
        <S.View>
          <S.HView>
            <S.Text>사진을 어디에 놓을까요?</S.Text>
            <TouchableOpacity onPress={closeModal}>
              <S.Text>X</S.Text>
            </TouchableOpacity>
          </S.HView>
          <Button title="첫번째" onPress={() => changeShowingPhoto(0)} />
          <Button title="두번째" onPress={() => changeShowingPhoto(1)} />
          <Button title="세번째" onPress={() => changeShowingPhoto(2)} />
          <Button title="네번째" onPress={() => changeShowingPhoto(3)} />
        </S.View>
      </Modal>
    </S.HomeLayout>
  );
};

export default Home;

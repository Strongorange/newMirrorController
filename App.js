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
import { Dimensions, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import uuid from "uuid";
import { BG_COLOR } from "./theme";
import { StatusBar } from "expo-status-bar";
import { FFmpegKit } from "ffmpeg-kit-react-native";
import * as RNFS from "react-native-fs";

const width = Math.floor(Dimensions.get("window").width);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxu1lGHVqTi9YrrFdMnaw3iHdGQX0Xq_c",
  authDomain: "newmirror-8ded5.firebaseapp.com",
  projectId: "newmirror-8ded5",
  storageBucket: "newmirror-8ded5.appspot.com",
  messagingSenderId: "419555949280",
  appId: "1:419555949280:web:f6580146b25e0816182e85",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage();

const listRef = ref(storage, "/");

const View = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${BG_COLOR};
`;

const View2 = styled(View)``;

const Separator = styled.View`
  width: 30px;
  height: 20px;
`;

const HView = styled.View`
  display: flex;
  flex-direction: row;
  width: ${`${width}px`};
  justify-content: space-evenly;
  margin-bottom: 15px;
`;

const StorageImageView = styled.FlatList`
  flex: 1;
`;

const Text = styled.Text`
  color: black;
`;

const ImageView = styled.View`
  position: relative;
`;

const Image = styled.Image`
  width: ${`${width / 3}px`};
  height: ${`${width / 3}px`};
  position: relative;
`;

const EditBtn = styled.TouchableOpacity``;

const DeleteBtn = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  padding: 10px;
  border-radius: 5px;
`;

const PhotoName = styled(Text)``;

const SelectBtn = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
  background-color: green;
  padding: 10px;
  border-radius: 5px;
`;

const AddBtn = styled.TouchableOpacity``;

const App = () => {
  const [photosArr, setPhotosArr] = useState([]);
  const [storagePhotos, setStoragePhotos] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isChange, setIsChange] = useState(false);

  function onResultPhoto(QuerySnapshot) {
    // console.log(QuerySnapshot.data());
    setPhotosArr(QuerySnapshot.data().photos);
  }

  function onResultSchedule(QuerySnapshot) {
    //console.log(QuerySnapshot._data);
  }

  function onError(error) {
    console.error(error);
  }

  const uploadToFirebase = async (imagePath, isVideo) => {
    console.log(`xhr 의 imagePath = ${imagePath}`);
    try {
      const blob = await new Promise((resolve, reject) => {
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

      const fileRef = ref(storage, uuid.v4());

      const storagePath = fileRef._location.path;
      const result2 = await uploadBytes(fileRef, blob);

      blob.close();
      const downloadUrl = await getDownloadURL(fileRef);
      setStoragePhotos((state) => [
        ...state,
        { uri: downloadUrl, path: storagePath },
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
          res.items.forEach((itemRef) => {
            const reference = ref(storage, itemRef.fullPath);
            getDownloadURL(reference).then((res) => {
              setStoragePhotos((state) => [
                ...state,
                { uri: res, path: reference._location.path },
              ]);
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
      setTimeout(() => setIsInitialLoading(false), 1000);
    }
  }, []);

  const renderItem = ({ item }) => {
    return isEdit ? (
      <>
        <ImageView>
          <Image source={{ uri: `${item.uri}` }} />
          <DeleteBtn
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
            <Text>삭제</Text>
          </DeleteBtn>
          <PhotoName>{item.path.slice(0, 10)}...</PhotoName>
        </ImageView>
      </>
    ) : isChange ? (
      <>
        <ImageView>
          <Image source={{ uri: `${item.uri}` }} />
          <SelectBtn
            onPress={async () => {
              Alert.alert("미러 사진 변경", "사진을 어디 놓을까요?", [
                {
                  text: "취소",
                  style: "cancel",
                },
                {
                  text: "첫번째",
                  onPress: () => {
                    try {
                      setIsLoading(true);
                      setPhotosArr((state) => [item.uri, state[1]]);
                    } catch (error) {
                      console.log(error);
                    } finally {
                      setIsLoading(false);
                      setIsChange(false);
                    }
                    firestore()
                      .collection("mirror")
                      .doc("gallery")
                      .set({
                        photos: [item.uri, photosArr[1]],
                      });
                  },
                },
                {
                  text: "두번째",
                  onPress: () => {
                    try {
                      setIsLoading(true);
                      setPhotosArr((state) => [state[0], item.uri]);
                    } catch (error) {
                      console.log(error);
                    } finally {
                      setIsLoading(false);
                      setIsChange(false);
                    }
                    firestore()
                      .collection("mirror")
                      .doc("gallery")
                      .set({
                        photos: [photosArr[0], item.uri],
                      });
                  },
                },
              ]);
              console.log(item);
            }}
          >
            <Text>선택</Text>
          </SelectBtn>
        </ImageView>
      </>
    ) : (
      <Image source={{ uri: `${item.uri}` }} />
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [1, 1],
    });

    console.log(result);

    //TODO: 비디오를 gif 로 처리
    if (!result.cancelled) {
      if (result.type === "video") {
        const createdGif = await FFmpegKit.execute(
          `-i ${result.uri} -y -vf scale=160:-1 -loop 0 ${RNFS.DocumentDirectoryPath}/animation.gif`
        );
        const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
        console.log(files);
        setImage(files[0].path);
        uploadToFirebase(files[0].path, true);
      } else {
        setImage(result.uri);
        uploadToFirebase(result.uri, false);
      }
    } else {
      alert("미디어 선택에서 오류 발생!");
    }
  };

  return isInitialLoading ? (
    <View>
      <Text>노루를 데려오는 중</Text>
    </View>
  ) : (
    <View>
      <View>
        <HView>
          <Text>현재</Text>
        </HView>
        {photosArr === null ? (
          <Text>노루를 데려오는 중</Text>
        ) : (
          <HView>
            {photosArr.map((c, i) => (
              <Image source={{ uri: `${c}` }} key={i} />
            ))}
          </HView>
        )}
      </View>
      <View2>
        <HView>
          <Text>저장된 사진 ({storagePhotos.length})</Text>
          <EditBtn onPress={() => setIsEdit((state) => !state)}>
            <Text>수정</Text>
          </EditBtn>
          <EditBtn onPress={() => setIsChange((state) => !state)}>
            <Text>현재 사진 변경 </Text>
          </EditBtn>
          <AddBtn onPress={() => pickImage()}>
            <Text>사진추가</Text>
          </AddBtn>
        </HView>

        {!isLoading && storagePhotos.length > 0 ? (
          <StorageImageView
            data={storagePhotos}
            renderItem={renderItem}
            horizontal={false}
            numColumns={2}
            contentContainerStyle={{
              justifyContents: "center",
              alignItems: "center",
            }}
            ItemSeparatorComponent={Separator}
          />
        ) : (
          <Text>노루를 데려오는 중</Text>
        )}
      </View2>
      <StatusBar />
    </View>
  );
};

export default App;

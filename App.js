import styled from "styled-components";
import React, { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

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
`;

const View2 = styled(View)``;

const StorageImageView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const Image = styled.Image`
  width: 100px;
  height: 100px;
`;

const App = () => {
  const [photos, setPhotos] = useState(null);
  const [storagePhotos, setStoragePhotos] = useState([]);
  const [schedules, setSchedules] = useState(null);

  function onResultPhoto(QuerySnapshot) {
    // console.log(QuerySnapshot.data());
    setPhotos(QuerySnapshot.data().photos);
  }

  function onResultSchedule(QuerySnapshot) {
    //console.log(QuerySnapshot._data);
  }

  function onError(error) {
    console.error(error);
  }

  useEffect(() => {
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
            setStoragePhotos((state) => [...state, res]);
          });
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  }, []);
  console.log(storagePhotos);
  return (
    <View>
      <View>
        <Text>현재</Text>
        {photos === null ? (
          <Text>노루를 데려오는 중</Text>
        ) : (
          photos.map((c, i) => <Image source={{ uri: `${c}` }} key={i} />)
        )}
      </View>
      <View2>
        <Text>스토리지</Text>
        <StorageImageView>
          {storagePhotos === null ? (
            <Text>노루를 데려오는 중</Text>
          ) : (
            storagePhotos.map((c, i) => (
              <Image source={{ uri: `${c}` }} key={i} />
            ))
          )}
        </StorageImageView>
      </View2>
    </View>
  );
};

export default App;

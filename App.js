import styled from "styled-components";
import React, { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

const View = styled.View`
  flex: 1;
  display: flex;
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
  }, []);
  console.log(photos);
  return (
    <View>
      {photos === null ? (
        <Text>노루를 데려오는 중</Text>
      ) : (
        photos.map((c, i) => <Image source={{ uri: `${c}` }} key={i} />)
      )}
    </View>
  );
};

export default App;

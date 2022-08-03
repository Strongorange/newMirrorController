import styled from "styled-components";
import React, { useEffect } from "react";
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
  const data = async () => {
    const temp = await firestore().collection("mirror").doc("gallery").get();
    console.log(temp);
  };

  useEffect(() => {
    const temp = data();
  });

  return (
    <View>
      <Text>hihihi</Text>
      <Image
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/newmirror-8ded5.appspot.com/o/ezgif-4-d8c432d814.gif?alt=media&token=a89744d4-6525-4d7f-b960-ce243923949a",
        }}
      />
    </View>
  );
};

export default App;

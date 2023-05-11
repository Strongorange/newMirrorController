import { View, Text } from "react-native";
import React from "react";
import initFB from "../utils/initFirebase";
import { Button } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import { useSetRecoilState } from "recoil";
import { userState } from "../states/authState";
import { useNavigation } from "@react-navigation/native";
import { storagePhotosState } from "../states/storagePhotosState";
import { showingPhotosState } from "../states/showingPhotosState";

const Settings = () => {
  const setUser = useSetRecoilState(userState);
  const setStoragePhoto = useSetRecoilState(storagePhotosState);
  const setShowingPhotos = useSetRecoilState(showingPhotosState);
  const navigation = useNavigation();
  // initFB();

  const handleLogout = () => {
    try {
      auth()
        .signOut()
        .then(() => {
          setUser(null);
          setStoragePhoto([]);
          setShowingPhotos([]);
          //@ts-ignore
          navigation.navigate("Login");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Button mode="contained" onPress={handleLogout}>
        로그아웃
      </Button>
    </View>
  );
};

export default Settings;

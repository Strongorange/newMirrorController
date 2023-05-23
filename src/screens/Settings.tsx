import React from "react";
import { Button } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import { useSetRecoilState } from "recoil";
import { userState } from "../states/authState";
import { useNavigation } from "@react-navigation/native";
import { storagePhotosState } from "../states/storagePhotosState";
import { showingPhotosState } from "../states/showingPhotosState";
import { SafeAreaView } from "react-native-safe-area-context";

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
          navigation.navigate("AuthStack", { screen: "Login" });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <Button mode="contained" onPress={handleLogout}>
        로그아웃
      </Button>
    </SafeAreaView>
  );
};

export default Settings;

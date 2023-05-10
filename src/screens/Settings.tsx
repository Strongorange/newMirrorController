import { View, Text } from "react-native";
import React from "react";
import initFB from "../utils/initFirebase";
import { Button } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import { useSetRecoilState } from "recoil";
import { userState } from "../states/authState";
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
  const setUser = useSetRecoilState(userState);
  const navigation = useNavigation();
  initFB();

  const handleLogout = async () => {
    try {
      await auth().signOut();
      setUser(null);
      //@ts-ignore
      navigation.navigate("Login");
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

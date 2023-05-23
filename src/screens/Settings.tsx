import React, { useEffect } from "react";
import * as S from "../styles/settings/settings.style";
import { Button } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "../states/authState";
import { useNavigation } from "@react-navigation/native";
import { storagePhotosState } from "../states/storagePhotosState";
import { showingPhotosState } from "../states/showingPhotosState";

const Settings = () => {
  const [user, setUser] = useRecoilState(userState);
  const setStoragePhoto = useSetRecoilState(storagePhotosState);
  const setShowingPhotos = useSetRecoilState(showingPhotosState);
  const navigation = useNavigation();

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

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
  }, []);

  return (
    <S.SettingsLayout>
      <S.UserInfoContainer>
        <S.EmailText>
          나의 이메일 <S.Strong>{user?.email}</S.Strong>
        </S.EmailText>
      </S.UserInfoContainer>
      <Button mode="contained" onPress={handleLogout}>
        로그아웃
      </Button>
    </S.SettingsLayout>
  );
};

export default Settings;

import React, { useState } from "react";
import * as S from "../../styles/auth/Login.style";
import initFB from "../../utils/initFirebase";
import auth from "@react-native-firebase/auth";
import { useNavigation, TypedNavigator } from "@react-navigation/native";

const Login = () => {
  initFB();

  // states
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Navigation 아동을 위한 navigation 객체
  const navigation = useNavigation();
  // functions
  const handleEmail = (email: string) => {
    setEmail(email);
  };

  const handlePassword = (password: string) => {
    setPassword(password);
  };

  const handleLogin = async () => {
    if (email === "" || password === "") {
      return;
    }

    try {
      await auth().signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      // @ts-ignore
      navigation.navigate("RootBottomTabs", { screen: "Photos" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.LoginLayout>
      <S.LoginForm>
        <S.InputWrapper>
          <S.FormInput
            mode="flat"
            label={"email"}
            onChangeText={(text) => handleEmail(text)}
          />
          <S.FormInput
            mode="flat"
            label={"password"}
            onChangeText={(text) => handlePassword(text)}
          />
        </S.InputWrapper>
        <S.ButtonWrapper>
          <S.FormButton mode="contained" onPress={handleLogin}>
            제출
          </S.FormButton>
        </S.ButtonWrapper>
      </S.LoginForm>
    </S.LoginLayout>
  );
};

export default Login;

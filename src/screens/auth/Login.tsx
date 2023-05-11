import React, { useEffect, useState } from "react";
import * as S from "../../styles/auth/Login.style";
import initFB from "../../utils/initFirebase";
import auth from "@react-native-firebase/auth";
import { useNavigation, TypedNavigator } from "@react-navigation/native";
import { useSetRecoilState } from "recoil";
import { userState } from "../../states/authState";

const Login = () => {
  // states
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const setUser = useSetRecoilState(userState);

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
      console.log("로그인 시도", email, password);
      const signInResponse = await auth().signInWithEmailAndPassword(
        email,
        password
      );
      setUser(signInResponse.user);

      console.log("로그인 성공", signInResponse.user.email);
      setEmail("");
      setPassword("");
      // @ts-ignore
      navigation.navigate("OthersBottomTabs", { screen: "Photos" });
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
            value={email}
            onChangeText={(text) => handleEmail(text)}
          />
          <S.FormInput
            mode="flat"
            label={"password"}
            value={password}
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

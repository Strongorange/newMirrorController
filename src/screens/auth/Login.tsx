import React, { useEffect, useRef, useState } from "react";
import * as S from "../../styles/auth/Auth.style";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useSetRecoilState } from "recoil";
import { userState } from "../../states/authState";
import { MD3Colors } from "react-native-paper";

const Login = () => {
  // Navigation 아동을 위한 navigation 객체
  const navigation = useNavigation();

  // states
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState<string>("");
  const setUser = useSetRecoilState(userState);

  //REFS
  const passwordRef = useRef(null);

  // FUNCTIONS
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

  const handleSignUpButton = () => {
    setEmail("");
    setPassword("");
    //@ts-ignore
    navigation.navigate("SignUp");
  };

  const focuseNextInput = (nextInput: any) => {
    if (nextInput) {
      nextInput.current.focus();
    }
  };

  // EFFECTS
  useEffect(() => {
    // email 값이 email 형식이 맞는지 확인
    // 이메일이 5글자 이상일때만 확인
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (email.length > 7) {
      emailRegex.test(email) ? setEmailError(false) : setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [email]);

  return (
    <S.AuthLayout>
      <S.AuthForm>
        <S.InputWrapper>
          <S.FormInput
            mode="flat"
            label={"이메일"}
            value={email}
            error={emailError}
            onChangeText={(text) => handleEmail(text)}
            textContentType="emailAddress"
            keyboardType="email-address"
            blurOnSubmit={false}
            returnKeyType="next"
            onSubmitEditing={() => focuseNextInput(passwordRef)}
          />

          <S.FormInput
            ref={passwordRef}
            mode="flat"
            label={"비밀번호"}
            value={password}
            onChangeText={(text) => handlePassword(text)}
            secureTextEntry
            textContentType="password"
            blurOnSubmit={false}
            returnKeyType="done"
          />
        </S.InputWrapper>
        <S.ButtonWrapper>
          <S.FormButton mode="contained" onPress={handleLogin}>
            로그인
          </S.FormButton>
          <S.FormButton
            mode="contained"
            onPress={handleSignUpButton}
            buttonColor={MD3Colors.primary60}
          >
            회원가입
          </S.FormButton>
        </S.ButtonWrapper>
      </S.AuthForm>
    </S.AuthLayout>
  );
};

export default Login;

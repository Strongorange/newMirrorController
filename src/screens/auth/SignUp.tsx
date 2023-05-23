import React, { useEffect, useRef, useState } from "react";
import * as S from "../../styles/auth/Auth.style";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

const SignUp = () => {
  const navigation = useNavigation();

  //STATES
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState(false);

  //REFS
  const passwordRef = useRef(null);
  const passwordCheckRef = useRef(null);
  //FUNCTIONS

  const handleSignUp = async () => {
    if (email === "" || password === "" || passwordCheck === "") {
      Alert.alert("회원가입 실패", "모든 항목을 입력해주세요", [
        {
          text: "확인",
          onPress: () => console.log("OK Pressed"),
        },
      ]);
      return;
    }
    try {
      const signUpResponse = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      Alert.alert("회원가입 성공", "", [
        {
          text: "확인",
          onPress: () => console.log("OK Pressed"),
        },
      ]);
      console.log("회원가입 성공", signUpResponse.user.email);

      setEmail("");
      setPassword("");
      setPasswordCheck("");

      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("회원가입 실패", String(error), [
        {
          text: "확인",
          onPress: () => console.log("OK Pressed"),
        },
        {
          text: "취소",
          onPress: () => console.log("Cancel Pressed"),
        },
      ]);
    }
  };

  const focusNextInput = (nextInput: any) => {
    if (nextInput.current) {
      nextInput.current.focus();
    }
  };

  //EFFECTS
  useEffect(() => {
    // email 값이 email 형식이 맞는지 확인
    // 이메일이 5글자 이상일때만 확인
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (email.length > 7) {
      emailRegex.test(email) ? setEmailError(false) : setEmailError(true);
    } else {
      setEmailError(false);
    }

    // password 값이 6글자 이상인지 확인
    if (password.length > 3) {
      password.length > 5 ? setPasswordError(false) : setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    // passwordCheck 값이 password 값과 같은지 확인
    password === passwordCheck
      ? setPasswordCheckError(false)
      : setPasswordCheckError(true);
  }, [email, password, passwordCheck]);

  return (
    <S.AuthLayout>
      <S.AuthForm>
        <S.InputWrapper>
          <S.FormInput
            mode="flat"
            label="이메일"
            value={email}
            onChangeText={(email) => setEmail(email)}
            error={emailError}
            textContentType="emailAddress"
            keyboardType="email-address"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => focusNextInput(passwordRef)}
          />
          <S.FormInput
            mode="flat"
            label="비밀번호"
            value={password}
            onChangeText={(password) => setPassword(password)}
            error={passwordError}
            ref={passwordRef}
            secureTextEntry
            textContentType="password"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => focusNextInput(passwordCheckRef)}
          />
          <S.FormInput
            mode="flat"
            label="비밀번호 확인"
            value={passwordCheck}
            onChangeText={(passwordCheck) => setPasswordCheck(passwordCheck)}
            error={passwordCheckError}
            ref={passwordCheckRef}
            secureTextEntry
            textContentType="password"
            returnKeyType="done"
          />
        </S.InputWrapper>
        <S.ButtonWrapper>
          <S.FormButton mode="contained" onPress={handleSignUp}>
            회원가입
          </S.FormButton>
        </S.ButtonWrapper>
      </S.AuthForm>
    </S.AuthLayout>
  );
};

export default SignUp;

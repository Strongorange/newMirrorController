import styled from "styled-components/native";
import { TextInput, Button, Text } from "react-native-paper";
import { getDeviceSize } from "../../utils/getDeviceSize";
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = getDeviceSize();

export const AuthLayout = styled(SafeAreaView)`
  flex: 1;
  background-color: #fffbff;
  justify-content: center;
  align-items: center;
`;

export const AuthForm = styled.View`
  width: 80%;
  height: ${`${height / 2}px`};
  padding: 10px 20px;
`;

export const InputWrapper = styled.View`
  flex: 3;
  justify-content: space-evenly;
`;

export const FormInput = styled(TextInput)``;

export const ButtonWrapper = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const FormButton = styled(Button)``;

export const ErrorMessage = styled(Text)``;

import styled from "styled-components/native";
import { TextInput, Button } from "react-native-paper";
import { getDeviceSize } from "../../utils/getDeviceSize";

const { width, height } = getDeviceSize();

export const LoginLayout = styled.View`
  flex: 1;
  background-color: teal;
  justify-content: center;
  align-items: center;
`;

export const LoginForm = styled.View`
  width: 80%;
  height: ${`${height / 2}px`};
  background-color: gray;
`;

export const InputWrapper = styled.View`
  flex: 3;
  justify-content: space-evenly;
`;

export const FormInput = styled(TextInput)``;

export const ButtonWrapper = styled.View`
  flex: 1;
`;

export const FormButton = styled(Button)``;

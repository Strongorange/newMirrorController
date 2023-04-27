import styled from "styled-components/native";
import { getDeviceSize } from "../../utils/getDeviceSize";
import { Button as PButton } from "react-native-paper";
import FastImage from "react-native-fast-image";

const { width, height } = getDeviceSize();

export const SwitchPhotoModalLayout = styled.View`
  background-color: white;
  width: ${`${width * 0.8}px`};
  height: ${`${height * 0.8}px`};
  border-radius: 15px;
  align-items: center;
  justify-content: space-evenly;
`;

export const Element = styled.View``;

export const Button = styled(PButton)``;

export const Image = styled(FastImage)`
  width: 100px;
  height: 100px;
`;

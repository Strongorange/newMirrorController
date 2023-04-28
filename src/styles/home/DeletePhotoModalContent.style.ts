import styled from "styled-components/native";
import { getDeviceSize } from "../../utils/getDeviceSize";
import FastImage from "react-native-fast-image";
import { Button as PButton } from "react-native-paper";

const { width, height } = getDeviceSize();

export const DeletePhotoModalLayout = styled.View`
  background-color: white;
  width: ${`${width * 0.8}px`};
  height: ${`${height * 0.6}px`};
  border-radius: 15px;
  align-items: center;
  justify-content: space-evenly;
`;

export const Image = styled(FastImage)`
  width: 250px;
  height: 250px;
  border-radius: 15px;
`;

export const ButtonContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  width: 70%;
`;

export const Button = styled(PButton)``;

import styled from "styled-components/native";
import { getDeviceSize } from "../../utils/getDeviceSize";

const { width, height } = getDeviceSize();

export const SwitchPhotoModalLayout = styled.View`
  background-color: white;
  width: ${`${width * 0.8}px`};
  height: ${`${height * 0.5}px`};
  border-radius: 15px;
`;

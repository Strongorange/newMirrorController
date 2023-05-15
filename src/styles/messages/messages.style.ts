import styled from "styled-components/native";
import { getDeviceSize } from "../../utils/getDeviceSize";

const { width, height } = getDeviceSize();

export const MessagesLayout = styled.View`
  flex: 1;
`;

export const MessageGridWrapper = styled.View`
  flex: 1;
`;

export const MessageGrid = styled.FlatList``;

export const MessageCardLayout = styled.View`
  width: 100%;
  height: ${height * 0.1}px;
  position: relative;
  justify-content: center;
  align-items: center;
`;

export const CardBackground = styled.ImageBackground`
  width: 100%;
  height: ${height * 0.1}px;
  opacity: 0.8;
  position: absolute;
  z-index: -1;
`;

export const CardTextWrapper = styled.View`
  background-color: rgba(0, 0, 0, 0.5);
`;

export const CardText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
  padding: 5px 10px;
`;

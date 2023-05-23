import styled from "styled-components/native";
import { getDeviceSize } from "../../utils/getDeviceSize";
import { FAB as FloatingButton, TextInput } from "react-native-paper";

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

export const MessageCRUDLayout = styled.View`
  flex: 1;
  position: relative;
  padding: 20px;
`;

export const CRUDItemWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CRUDItem = styled.Text``;

export const CRUDItemButtonWrapper = styled.View`
  flex-direction: row;
`;

export const CRUDItemButton = styled.Pressable``;

export const FAB = styled(FloatingButton)`
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 20px;
`;

export const CreateMessageModalLayout = styled.View`
  width: ${width * 0.8}px;
  height: ${height * 0.5}px;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

export const UpdateMessageModalLayout = styled(CreateMessageModalLayout)``;

export const Input = styled(TextInput)`
  width: 100%;
`;

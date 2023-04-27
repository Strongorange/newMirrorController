import { FlatList, Dimensions } from "react-native";
import FastImage from "react-native-fast-image";
import styled from "styled-components/native";
import { getDeviceSize } from "../../utils/getDeviceSize";

const { width } = getDeviceSize();

export const FirestorePhotosLayout = styled.View`
  flex: 3;
`;

export const ControlersBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ControlerName = styled.Text`
  color: black;
  font-size: 14px;
`;

export const FlatListContainer = styled.View`
  flex: 1;
`;

export const ImageFlatList = styled.FlatList`
  flex: 1;
` as unknown as typeof FlatList;

export const ImageContainer = styled.View`
  flex: 1;
`;

export const Image = styled(FastImage)`
  width: ${`${width / 2}px`};
  height: ${`${width / 2}px`};
`;

import { FlatList, Dimensions } from "react-native";
import FastImage from "react-native-fast-image";
import styled from "styled-components/native";
import { getDeviceSize } from "../../utils/getDeviceSize";

const { width } = getDeviceSize();

export const FirestorePhotosLayout = styled.View`
  flex: 3;
`;

export const FlatListContainer = styled.View`
  flex: 1;
`;

export const ImageFlatList = styled.FlatList`
  flex: 1;
` as unknown as typeof FlatList;

export const ImageContainer = styled.View`
  position: relative;
`;

export const Image = styled(FastImage)`
  width: ${`${width / 2}px`};
  height: ${`${width / 2}px`};
  z-index: 0;
`;

export const NoImagesContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const NoImagesText = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

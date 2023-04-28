import { Dimensions } from "react-native";
import FastImage from "react-native-fast-image";
import styled from "styled-components/native";

const width = Math.floor(Dimensions.get("window").width);

export const CurrentPhotoContainer = styled.View`
  flex: 2;
  align-items: stretch;
`;

export const CurrentPhotoTitle = styled.Text`
  font-size: 22px;
  font-weight: 600;
  padding: 20px 0;
`;

export const CurrentPhotoSlider = styled.FlatList``;

export const Image = styled(FastImage)`
  width: ${`${width / 2.5}px`};
  height: ${`${width / 2.5}px`};
  position: relative;
`;

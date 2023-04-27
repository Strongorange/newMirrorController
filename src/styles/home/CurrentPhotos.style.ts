import { Dimensions } from "react-native";
import FastImage from "react-native-fast-image";
import styled from "styled-components/native";

const width = Math.floor(Dimensions.get("window").width);

export const CurrentPhotoContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.MAIN};
`;

export const CurrentPhotoTitle = styled.Text`
  font-size: 22px;
  font-weight: 600;
`;

export const CurrentPhotoSlider = styled.FlatList``;

export const TempView = styled.ScrollView``;

export const Image = styled(FastImage)`
  width: ${`${width / 3}px`};
  height: ${`${width / 3}px`};
  position: relative;
`;

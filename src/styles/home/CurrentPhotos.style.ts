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

export const ImageWrapper = styled.View`
  position: relative;
`;

export const Image = styled(FastImage)`
  width: ${`${width / 2.5}px`};
  height: ${`${width / 2.5}px`};
  position: relative;
`;

export const VideoBadge = styled.Text`
  position: absolute;
  right: 8px;
  bottom: 8px;
  padding: 4px 6px;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  font-size: 11px;
  font-weight: 700;
  overflow: hidden;
`;

export const NoCurrentPhotos = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const NoCurrentPhotosText = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

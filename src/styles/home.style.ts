import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { BG_COLOR } from "../../theme";

const width = Math.floor(Dimensions.get("window").width);

export const HomeLayout = styled.View`
  flex: 1;
`;

export const View = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${BG_COLOR};
`;

export const CurrentPhotoContainer = styled.View``;

export const View2 = styled(View)``;

export const Separator = styled.View`
  width: 30px;
  height: 20px;
`;

export const HView = styled.View`
  display: flex;
  flex-direction: row;
  width: ${`${width}px`};
  justify-content: space-evenly;
  margin-bottom: 15px;
`;

export const StorageImageView = styled.FlatList`
  flex: 1;
`;

export const Text = styled.Text`
  color: black;
`;

export const ImageView = styled.View`
  position: relative;
`;

export const Image = styled.Image`
  width: ${`${width / 3}px`};
  height: ${`${width / 3}px`};
  position: relative;
`;

export const EditBtn = styled.TouchableOpacity``;

export const DeleteBtn = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  padding: 10px;
  border-radius: 5px;
`;

export const PhotoName = styled(Text)``;

export const SelectBtn = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
  background-color: green;
  padding: 10px;
  border-radius: 5px;
`;

export const AddBtn = styled.TouchableOpacity``;

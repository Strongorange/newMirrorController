import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, IconButton } from "react-native-paper";

export const LocationLayout = styled(SafeAreaView)`
  flex: 1;
`;

export const CurrentLocationLayout = styled.View`
  flex: 1;
`;

export const CurrentLocationCard = styled(Card)``;

export const CardRow = styled.View`
  flex-direction: row;
`;

export const Title = styled.Text``;

export const Text = styled.Text``;

export const StationNotFound = styled.View``;

export const AddStation = styled(Card)``;

export const AddButton = styled(IconButton)``;

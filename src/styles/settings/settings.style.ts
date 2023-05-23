import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const SettingsLayout = styled(SafeAreaView)`
  flex: 1;
  padding: 20px;
  background-color: "#FFFBFF";
`;

export const UserInfoContainer = styled.View`
  flex: 1;
`;

export const EmailText = styled.Text``;

export const Strong = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

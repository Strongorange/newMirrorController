import { Dimensions } from "react-native";

const width = Math.floor(Dimensions.get("window").width);
const height = Math.floor(Dimensions.get("window").height);

export const getDeviceSize = () => {
  return { width, height };
};

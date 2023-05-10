import { atom } from "recoil";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export const userState = atom<FirebaseAuthTypes.User | null>({
  key: "userState",
  default: null,
});

export const isLoggedInState = atom<boolean>({
  key: "isLoggedInState",
  default: false,
});

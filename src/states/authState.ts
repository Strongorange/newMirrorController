import { atom } from "recoil";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import ReactNativeRecoilPersist from "react-native-recoil-persist";

export const userState = atom<FirebaseAuthTypes.User | null>({
  key: "userState",
  default: null,
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

export const isLoggedInState = atom<boolean>({
  key: "isLoggedInState",
  default: false,
});

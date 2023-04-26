import { atom } from "recoil";
import ReactNativeRecoilPersist from "react-native-recoil-persist";
import { ShowingPhtos } from "../types/firebasePhotos";

export const showingPhotosState = atom<ShowingPhtos>({
  key: "showingPhotosState",
  default: [],
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

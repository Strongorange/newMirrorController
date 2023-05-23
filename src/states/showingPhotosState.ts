import { atom } from "recoil";

import { ShowingPhtos } from "../types/firebasePhotos";

export const showingPhotosState = atom<ShowingPhtos>({
  key: "showingPhotosState",
  default: [],
});

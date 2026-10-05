import { atom } from "recoil";

import { ShowingPhtos } from "../types/firebasePhotos";
import { createEmptyGallerySlots } from "../types/mediaTypes";

export const showingPhotosState = atom<ShowingPhtos>({
  key: "showingPhotosState",
  default: createEmptyGallerySlots(),
});

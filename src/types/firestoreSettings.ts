import { DustStation } from "./dustStationTypes";

export interface FirestoreSettings {
  location: {
    selected: DustStation;
  };
  theme: string;
}

export const defaultFirestoreSettings: FirestoreSettings = {
  location: {
    selected: {
      addr: "",
      dmX: "",
      dmY: "",
      item: "",
      mangName: "",
      stationName: "",
      year: "",
    },
  },
  theme: "light",
};

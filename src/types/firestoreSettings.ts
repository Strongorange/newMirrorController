export interface FirestoreSettings {
  location: {
    selected: {
      latitude: number;
      longitude: number;
      dmX: string;
      dmY: string;
      stationName: string;
      addr: string;
      item: string;
    };
  };
  theme: string;
}

export const defaultFirestoreSettings: FirestoreSettings = {
  location: {
    selected: {
      latitude: 0,
      longitude: 0,
      dmX: "0",
      dmY: "0",
      stationName: "",
      addr: "",
      item: "",
    },
  },
  theme: "light",
};

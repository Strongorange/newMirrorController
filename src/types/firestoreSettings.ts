export interface FirestoreSettings {
  location: {
    selected: {
      latitude: number;
      longitude: number;
    };
  };
  theme: string;
}

export const defaultFirestoreSettings: FirestoreSettings = {
  location: {
    selected: {
      latitude: 0,
      longitude: 0,
    },
  },
  theme: "light",
};

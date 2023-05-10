import { atom, selector } from "recoil";
import ReactNativeRecoilPersist from "react-native-recoil-persist";

export const messagesState = atom({
  key: "messagesState",
  default: {},
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

export const isMessagesLoadingState = selector({
  key: "isMessagesLoadingState",
  get: ({ get }) => {
    const messages = get(messagesState);
    return Object.keys(messages).length === 0;
  },
});

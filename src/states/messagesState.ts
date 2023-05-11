import { atom, selector } from "recoil";

export const messagesState = atom({
  key: "messagesState",
  default: {},
});

export const isMessagesLoadingState = selector({
  key: "isMessagesLoadingState",
  get: ({ get }) => {
    const messages = get(messagesState);
    return Object.keys(messages).length === 0;
  },
});

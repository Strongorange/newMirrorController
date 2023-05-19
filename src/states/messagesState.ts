import { atom, selector, selectorFamily } from "recoil";
import { defaultMessages, MessagesType } from "../types/messagesTypes";

export const messagesState = atom({
  key: "messagesState",
  default: defaultMessages,
});

// key를 받아서 해당 key의 value를 반환하는 selectorFamily
export const messageSelector = selectorFamily({
  key: "messageSelector",
  get:
    (key: keyof MessagesType) =>
    ({ get }) => {
      const messages = get(messagesState);
      return messages[key];
    },
});

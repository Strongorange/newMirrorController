import React, { useCallback, useEffect, useState } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { useRecoilState, useRecoilValue } from "recoil";
import { messagesState } from "../states/messagesState";
import { ActivityIndicator } from "react-native-paper";
import { userState } from "../states/authState";
import { MessagesType } from "../types/messagesTypes";
import * as S from "../styles/messages/messages.style";
import MessageGrid from "../components/messages/MessageGrid";

const Messages = () => {
  const [messages, setMessages] = useRecoilState(messagesState);
  const [isLoading, setIsLoading] = useState(true);
  const user = useRecoilValue(userState);

  // FUNCTIONS

  const onResultMessage = useCallback(
    (
      QuerySnapshot: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
    ) => {
      const data = QuerySnapshot.data();

      console.log(data);
      if (data) {
        // as 로 타입 단언
        const messages = data as MessagesType;
        setMessages(messages);
      }

      if (messages) {
        setIsLoading(false);
      }
    },
    []
  );

  const onError = (error: Error) => {
    console.log(error);
  };

  // EFFECTS

  useEffect(() => {
    setIsLoading(true);
    let messageUnsubscribe: () => void;
    try {
      messageUnsubscribe = firestore()
        .collection(user?.uid || "")
        .doc("messages")
        .onSnapshot(onResultMessage, onError);
    } catch (error) {
      console.log(error);
    }

    // 언마운트시 구독 해제
    return () => {
      if (messageUnsubscribe) {
        messageUnsubscribe();
      }
    };
  }, []);

  // 디버깅
  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <S.MessagesLayout style={{ flex: 1 }}>
      {isLoading && <ActivityIndicator size={68} />}
      {!isLoading && <MessageGrid messages={messages} />}
    </S.MessagesLayout>
  );
};

export default Messages;

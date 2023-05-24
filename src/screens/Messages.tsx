import React, { useCallback, useEffect, useState } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { useRecoilState, useRecoilValue } from "recoil";
import { messagesState } from "../states/messagesState";
import { ActivityIndicator } from "react-native-paper";
import { userState } from "../states/authState";
import { defaultMessages, MessagesType } from "../types/messagesTypes";
import * as S from "../styles/messages/messages.style";
import MessageGrid from "../components/messages/MessageGrid";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Messages = () => {
  const [messages, setMessages] = useRecoilState(messagesState);
  const [isLoading, setIsLoading] = useState(true);
  const user = useRecoilValue(userState);
  const navigation = useNavigation();

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

  const checkMessagesRef = async () => {
    let messageUnsubscribe: () => void;
    if (user) {
      setIsLoading(true);
      const docuemntRef = firestore().collection(user.uid).doc("messages");
      const document = await docuemntRef.get();
      if (!document.exists) {
        await docuemntRef.set(defaultMessages);
        checkMessagesRef();
      } else {
        try {
          messageUnsubscribe = firestore()
            .collection(user.uid)
            .doc("messages")
            .onSnapshot(onResultMessage, onError);
        } catch (error) {
          console.log(error);
        }
      }
    }
    return () => {
      if (messageUnsubscribe) {
        messageUnsubscribe();
      }
    };
  };

  // EFFECTS

  useEffect(() => {
    if (user === null) {
      //@ts-ignore
      navigation.navigate("AuthStack");
      return;
    } else {
      console.log("message User", user);
      setIsLoading(true);
      let messageUnsubscribe: () => void;
      checkMessagesRef();

      // 언마운트시 구독 해제
      return () => {
        if (messageUnsubscribe) {
          messageUnsubscribe();
        }
      };
    }
  }, [user]);

  // 디버깅
  useEffect(() => {
    console.log("messages", messages);
  }, [messages]);

  return (
    <S.MessagesLayout style={{ flex: 1 }}>
      {isLoading && (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size={68} />
        </View>
      )}
      {!isLoading && <MessageGrid messages={messages} />}
    </S.MessagesLayout>
  );
};

export default Messages;

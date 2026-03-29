import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    if (user === null) {
      //@ts-ignore
      navigation.navigate("AuthStack");
      setIsLoading(false);
      return;
    }

    const documentRef = firestore().collection(user.uid).doc("messages");
    let unsubscribe: (() => void) | undefined;

    const subscribe = async () => {
      setIsLoading(true);

      const document = await documentRef.get();
      if (!document.exists) {
        await documentRef.set(defaultMessages);
      }

      unsubscribe = documentRef.onSnapshot(
        (
          querySnapshot: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
        ) => {
          const data = querySnapshot.data();

          if (data) {
            setMessages(data as MessagesType);
          }

          setIsLoading(false);
        },
        (error: Error) => {
          console.log(error);
          setIsLoading(false);
        }
      );
    };

    subscribe().catch((error) => {
      console.log(error);
      setIsLoading(false);
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
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

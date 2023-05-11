import { View, Text } from "react-native";
import React, { useCallback, useEffect } from "react";
import initFB from "../utils/initFirebase";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { useRecoilState, useRecoilValue } from "recoil";
import { isMessagesLoadingState, messagesState } from "../states/messagesState";
import { ActivityIndicator } from "react-native-paper";

// initFB();

const Messages = () => {
  const [messages, setMessages] = useRecoilState(messagesState);
  const isLoading = useRecoilValue(isMessagesLoadingState);

  const onResultMessage = useCallback(
    (
      QuerySnapshot: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
    ) => {
      // setMessages(QuerySnapshot.data());
    },
    []
  );

  const onError = (error: Error) => {
    console.log(error);
  };

  useEffect(() => {
    try {
      firestore()
        .collection("mirror")
        .doc("message")
        .onSnapshot(onResultMessage, onError);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isLoading && <ActivityIndicator size={68} />}
      {!isLoading && <Text>쟂</Text>}
    </View>
  );
};

export default Messages;

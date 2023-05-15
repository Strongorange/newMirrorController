import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { RouteProp } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import { messageSelector } from "../../states/messagesState";
import { MessagesType } from "../../types/messagesTypes";

type StackParamList = {
  MessagesCRUD: {
    key: keyof MessagesType;
  };
};

type MeesagesCRUDScreenRouteProp = RouteProp<StackParamList, "MessagesCRUD">;

interface MessagesCRUDProps {
  route: MeesagesCRUDScreenRouteProp;
}

const MessagesCRUD = ({ route }: MessagesCRUDProps) => {
  const { key } = route.params;
  const messages = useRecoilValue(messageSelector(key));

  //디버깅
  useEffect(() => {
    console.log("messages of CRUD", messages);
  }, [messages]);

  return (
    <View>
      <Text>MessagesCRUD</Text>
    </View>
  );
};

export default MessagesCRUD;

import { View, Text, FlatList } from "react-native";
import React, { useCallback, useEffect } from "react";
import * as S from "../../styles/messages/messages.style";
import { MessagesType } from "../../types/messagesTypes";
import { ListRenderItem } from "react-native";
import MessageCard from "./MessageCard";

interface MessageGridProps {
  messages: MessagesType;
}

interface MessageGridItem {
  key: string;
  value: string[];
}

const MessageGrid = ({ messages }: MessageGridProps) => {
  const renderItem = useCallback<ListRenderItem<MessageGridItem>>(
    ({ item }) => {
      return <MessageCard item={item} />;
    },
    []
  );
  // key value 객체를 배열로 변환
  const messageArray = Object.entries(messages).map(([key, value]) => ({
    key,
    value,
  }));

  useEffect(() => {
    console.log("messageArray", messageArray);
  }, []);

  return (
    <S.MessageGridWrapper>
      <FlatList data={messageArray} renderItem={renderItem} />
    </S.MessageGridWrapper>
  );
};

export default MessageGrid;

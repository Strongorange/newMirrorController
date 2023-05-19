import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";
import * as S from "../../styles/messages/messages.style";

interface MessageCardProps {
  item: {
    key: string;
    value: string[];
  };
}

const tempImgUrl =
  "https://images.unsplash.com/photo-1682685797795-5640f369a70a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2971&q=80";

const MessageCard = ({ item }: MessageCardProps) => {
  const navigation = useNavigation();

  const goToMessageDetail = () => {
    // @ts-ignore
    navigation.navigate("MessagesCRUD", { key: item.key });
  };

  return (
    <Pressable onPress={goToMessageDetail}>
      <S.MessageCardLayout>
        <S.CardTextWrapper>
          <S.CardText>{item.key}</S.CardText>
          <S.CardText>{item.value.length}개의 메세지</S.CardText>
        </S.CardTextWrapper>
        <S.CardBackground source={{ uri: tempImgUrl }} resizeMode="cover" />
      </S.MessageCardLayout>
    </Pressable>
  );
};

export default MessageCard;

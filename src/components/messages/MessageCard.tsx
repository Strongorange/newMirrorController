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

const imageByWeather: { [key: string]: string } = {
  morning:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3132&q=30",
  clouds:
    "https://images.unsplash.com/photo-1536514498073-50e69d39c6cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=30",
  thunder:
    "https://images.unsplash.com/photo-1559087867-ce4c91325525?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=30",
  drizzle:
    "https://images.unsplash.com/photo-1576234699886-7eb7f11aecb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=30",
  dawn: "https://images.unsplash.com/photo-1503424160383-57de83bd6fb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=30",
  clear:
    "https://images.unsplash.com/photo-1462524500090-89443873e2b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=30",
  day: "https://images.unsplash.com/photo-1628846229978-dbaa80b84aec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=30",
  night:
    "https://images.unsplash.com/photo-1506606401543-2e73709cebb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=30",
  snow: "https://images.unsplash.com/photo-1542601098-8fc114e148e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=30",
  midnight:
    "https://images.unsplash.com/photo-1520607031983-c48077cb6308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=30",
  rain: "https://images.unsplash.com/photo-1527766833261-b09c3163a791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=30",
  always:
    "https://plus.unsplash.com/premium_photo-1674374443278-bb6b314ba56e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=30",
};

const tempImgUrl =
  "https://images.unsplash.com/photo-1682685797795-5640f369a70a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2971&q=30";

const MessageCard = ({ item }: MessageCardProps) => {
  const navigation = useNavigation();
  const imageUrl = imageByWeather[item.key];
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
        <S.CardBackground source={{ uri: imageUrl }} resizeMode="cover" />
      </S.MessageCardLayout>
    </Pressable>
  );
};

export default MessageCard;

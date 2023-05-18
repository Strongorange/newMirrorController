import { Text, FlatList, ListRenderItem } from "react-native";
import React, { useCallback, useEffect } from "react";
import { RouteProp } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import { messageSelector } from "../../states/messagesState";
import { MessagesType } from "../../types/messagesTypes";
import * as S from "../../styles/messages/messages.style";
import { Button, FAB } from "react-native-paper";
import { useModal } from "../../hooks/useModal";
import CreateMessageModal from "../../components/modals/messages/CreateMessageModal";

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
  const { openModal, changeModalContent } = useModal();

  // FUNCTIONS

  const createMessage = () => {
    //TODO: 메세지 생성
    console.log("와우");
    openModal({
      content: (
        <CreateMessageModal currentKey={key} currentMessages={messages} />
      ),
    });
  };

  const renderItem = useCallback<ListRenderItem<string>>(({ item }) => {
    return (
      <S.CRUDItemWrapper>
        <S.CRUDItem>{item}</S.CRUDItem>
        <S.CRUDItemButtonWrapper>
          <Button mode="contained-tonal" onPress={createMessage}>
            삭제
          </Button>
        </S.CRUDItemButtonWrapper>
      </S.CRUDItemWrapper>
    );
  }, []);
  //디버깅
  useEffect(() => {
    console.log("messages of CRUD", messages);
  }, [messages]);

  return (
    <S.MessageCRUDLayout>
      <FlatList data={messages} renderItem={renderItem} />
      <S.FAB icon="plus" onPress={createMessage} />
    </S.MessageCRUDLayout>
  );
};

export default MessagesCRUD;

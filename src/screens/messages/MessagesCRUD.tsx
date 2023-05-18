import { Text, FlatList, ListRenderItem } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import { messageSelector } from "../../states/messagesState";
import { MessagesType } from "../../types/messagesTypes";
import * as S from "../../styles/messages/messages.style";
import { ActivityIndicator, Button, Dialog, Portal } from "react-native-paper";
import { useModal } from "../../hooks/useModal";
import CreateMessageModal from "../../components/modals/messages/CreateMessageModal";
import firestore from "@react-native-firebase/firestore";
import { userState } from "../../states/authState";

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
  const [dialogVisible, setDialogVisible] = useState(false);
  const [willDeleteMessage, setWillDeleteMessage] = useState<string>("");
  const user = useRecoilValue(userState);

  // FUNCTIONS

  const closeDialog = () => {
    setDialogVisible(false);
  };

  const openDialog = (item: string) => {
    setWillDeleteMessage(item);
    setDialogVisible(true);
  };

  const createMessage = () => {
    openModal({
      content: (
        <CreateMessageModal currentKey={key} currentMessages={messages} />
      ),
    });
  };

  const deleteMessage = async () => {
    //TODO: 메세지 삭제
    if (user) {
      const documentRef = firestore().collection(user.uid).doc("messages");
      const document = await documentRef.get();

      if (document.exists) {
        try {
          await documentRef.update({
            [key]: firestore.FieldValue.arrayRemove(willDeleteMessage),
          });
          closeDialog();
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("document does not exist");
      }
    } else {
      console.log("user is null");
    }
  };

  const renderItem = useCallback<ListRenderItem<string>>(({ item }) => {
    return (
      <S.CRUDItemWrapper>
        <S.CRUDItem>{item}</S.CRUDItem>
        <S.CRUDItemButtonWrapper>
          <Button mode="contained-tonal" onPress={() => openDialog(item)}>
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
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={closeDialog}>
          <Dialog.Title>메세지 삭제</Dialog.Title>
          <Dialog.Content>
            <Text
              style={{ fontStyle: "italic", textDecorationLine: "underline" }}
            >
              {willDeleteMessage}
            </Text>
            <Text>를 삭제하시겠습니까?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={deleteMessage}>확인</Button>
            <Button onPress={closeDialog}>취소</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </S.MessageCRUDLayout>
  );
};

export default MessagesCRUD;

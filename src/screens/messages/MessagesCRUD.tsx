import { Text, FlatList, ListRenderItem } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import { messageSelector } from "../../states/messagesState";
import { MessagesType } from "../../types/messagesTypes";
import * as S from "../../styles/messages/messages.style";
import { Button, Dialog, Portal, IconButton } from "react-native-paper";
import { useModal } from "../../hooks/useModal";
import CreateMessageModal from "../../components/modals/messages/CreateMessageModal";
import firestore from "@react-native-firebase/firestore";
import { userState } from "../../states/authState";
import UpdateMessageModal from "../../components/modals/messages/UpdateMessageModal";

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
  const [willChangeMessage, setWillChangeMessage] = useState<string>("");
  const user = useRecoilValue(userState);
  const navigation = useNavigation();

  // FUNCTIONS

  const closeDialog = () => {
    setDialogVisible(false);
  };

  const openDialog = (item: string) => {
    setWillChangeMessage(item);
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
    if (user) {
      const documentRef = firestore().collection(user.uid).doc("messages");
      const document = await documentRef.get();

      if (document.exists) {
        try {
          await documentRef.update({
            [key]: firestore.FieldValue.arrayRemove(willChangeMessage),
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

  const updateMessage = async (item: string) => {
    openModal({
      content: <UpdateMessageModal currentKey={key} currentMessage={item} />,
    });
  };

  const renderItem = useCallback<ListRenderItem<string>>(({ item }) => {
    return (
      <S.CRUDItemWrapper>
        <S.CRUDItem>{item}</S.CRUDItem>
        <S.CRUDItemButtonWrapper>
          <IconButton
            icon="trash-can-outline"
            onPress={() => openDialog(item)}
          />

          <IconButton
            icon="pencil-outline"
            onPress={() => updateMessage(item)}
          />
        </S.CRUDItemButtonWrapper>
      </S.CRUDItemWrapper>
    );
  }, []);

  // EFFECTS
  // 헤더 타이틀을 `key` 값으로 변경
  useEffect(() => {
    if (key) {
      navigation.setOptions({ title: key });
    }
  }, [key]);

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
              {willChangeMessage}
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

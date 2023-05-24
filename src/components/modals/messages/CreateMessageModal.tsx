import { View, Text } from "react-native";
import React, { useState } from "react";
import * as S from "../../../styles/messages/messages.style";
import { Button } from "react-native-paper";
import { userState } from "../../../states/authState";
import { useRecoilValue } from "recoil";
import firestore from "@react-native-firebase/firestore";
import { useModal } from "../../../hooks/useModal";

interface CreateMessageModalProps {
  currentKey: string;
  currentMessages: string[];
}

const CreateMessageModal = ({
  currentKey,
  currentMessages,
}: CreateMessageModalProps) => {
  const [text, setText] = useState<string>("");
  const user = useRecoilValue(userState);
  const { closeModal } = useModal();

  const createMessage = async () => {
    //TODO: 메세지 생성
    if (text === "") return;
    if (user === null) return;
    // react native firebase 를 사용해 firestore의 uid collection의 messages에 text를 추가
    console.log(currentKey);
    try {
      const documentRef = firestore().collection(user.uid).doc("messages");
      const document = await documentRef.get();

      if (document.exists) {
        await documentRef.update({
          [currentKey]: firestore.FieldValue.arrayUnion(text),
        });
        console.log("추가 완료");
      } else {
        console.log("document not exists");
      }
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.CreateMessageModalLayout>
      <S.Input
        label="추가할 텍스트"
        value={text}
        onChangeText={(text) => setText(text)}
      />

      <Button mode="contained-tonal" onPress={createMessage}>
        추가
      </Button>
    </S.CreateMessageModalLayout>
  );
};

export default CreateMessageModal;

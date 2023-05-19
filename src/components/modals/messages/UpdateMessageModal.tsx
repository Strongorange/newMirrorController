import React, { useState } from "react";
import * as S from "../../../styles/messages/messages.style";
import { Button } from "react-native-paper";
import { useRecoilValue } from "recoil";
import { userState } from "../../../states/authState";
import { useModal } from "../../../hooks/useModal";
import firestore from "@react-native-firebase/firestore";

interface UpdateMessageModalProps {
  currentKey: string;
  currentMessage: string;
}

const UpdateMessageModal = ({
  currentKey,
  currentMessage,
}: UpdateMessageModalProps) => {
  const [text, setText] = useState<string>(currentMessage);
  const user = useRecoilValue(userState);
  const { closeModal } = useModal();

  const updateMessage = async () => {
    if (text === currentMessage) return;
    if (text === "") return;
    if (user) {
      const documentRef = firestore().collection(user.uid).doc("messages");
      const document = await documentRef.get();

      if (document.exists) {
        const data = document.data();
        if (data && data[currentKey]) {
          const newArray = data[currentKey].map((arrayItem: string) =>
            arrayItem === currentMessage ? text : arrayItem
          );

          console.log("newArray", newArray);

          await documentRef.update({
            [currentKey]: newArray,
          });
          closeModal();
        }
      } else {
        console.log("document does not exist");
      }
    } else {
      console.log("user is null");
    }
  };

  return (
    <S.UpdateMessageModalLayout>
      <S.Input
        label="수정할 텍스트"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <Button mode="contained-tonal" onPress={updateMessage}>
        수정
      </Button>
    </S.UpdateMessageModalLayout>
  );
};

export default UpdateMessageModal;

import { View, Text } from "react-native";
import React from "react";
import { Portal, Modal } from "react-native-paper";
import { useModal } from "../../hooks/useModal";

const ModalBase = () => {
  const {
    storagePhotosControl: { isModalVisible, modalContent },
    closeModal,
  } = useModal();

  return (
    <Portal>
      <Modal
        visible={isModalVisible}
        onDismiss={closeModal}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        {modalContent}
      </Modal>
    </Portal>
  );
};

export default ModalBase;

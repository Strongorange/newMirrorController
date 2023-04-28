import React from "react";
import { IconButton, MD2Colors } from "react-native-paper";
import styled from "styled-components/native";

const Layout = styled.View``;

const FinishModal = () => {
  return (
    <Layout>
      <IconButton icon="check-bold" size={64} iconColor={MD2Colors.amber400} />
    </Layout>
  );
};

export default FinishModal;

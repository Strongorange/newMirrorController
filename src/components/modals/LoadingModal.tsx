import React from "react";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import styled from "styled-components/native";

const Layout = styled.View``;

const LoadingModal = () => {
  return (
    <Layout>
      <ActivityIndicator color={MD2Colors.amber400} size={64} />
    </Layout>
  );
};

export default LoadingModal;

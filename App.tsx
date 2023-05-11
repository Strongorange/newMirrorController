import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./src/navigations/RootNavigation";
import { RecoilRoot, useRecoilState } from "recoil";
import ReactNativeRecoilPersist, {
  ReactNativeRecoilPersistGate,
} from "react-native-recoil-persist";
import theme from "./src/styles/theme";
import { ThemeProvider } from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import ModalBase from "./src/components/modals/ModalBase";
import { isLoggedInState, userState } from "./src/states/authState";
import auth from "@react-native-firebase/auth";
import initFB from "./src/utils/initFirebase";

SplashScreen.preventAutoHideAsync();

const AppContent = () => {
  const [userAtom, setUserAtom] = useRecoilState(userState);

  useEffect(() => {
    console.log("user From App.tsx", userAtom?.email);
  }, [userAtom]);

  return (
    <PaperProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <RootNavigation />
          <StatusBar style="dark" />
          <ModalBase />
        </NavigationContainer>
      </ThemeProvider>
    </PaperProvider>
  );
};

const App = () => {
  initFB();

  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    hideSplash();
  }, []);

  return (
    <RecoilRoot>
      <ReactNativeRecoilPersistGate store={ReactNativeRecoilPersist}>
        <AppContent />
      </ReactNativeRecoilPersistGate>
    </RecoilRoot>
  );
};

export default App;

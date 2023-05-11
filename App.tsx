import React, { useEffect } from "react";
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
import { userState } from "./src/states/authState";
import initFB from "./src/utils/initFirebase";

SplashScreen.preventAutoHideAsync();

const App = () => {
  initFB();

  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    hideSplash();
  }, []);

  return (
    <NavigationContainer>
      <RecoilRoot>
        <ReactNativeRecoilPersistGate store={ReactNativeRecoilPersist}>
          <PaperProvider>
            <ThemeProvider theme={theme}>
              <RootNavigation />
              <StatusBar style="dark" />
              <ModalBase />
            </ThemeProvider>
          </PaperProvider>
        </ReactNativeRecoilPersistGate>
      </RecoilRoot>
    </NavigationContainer>
  );
};

export default App;

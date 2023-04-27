import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./src/navigations/RootNavigation";
import { RecoilRoot } from "recoil";
import ReactNativeRecoilPersist, {
  ReactNativeRecoilPersistGate,
} from "react-native-recoil-persist";
import theme from "./src/styles/theme";
import { ThemeProvider } from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import ModalBase from "./src/components/modals/ModalBase";

SplashScreen.preventAutoHideAsync();

const App = () => {
  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    hideSplash();
  }, []);

  return (
    <RecoilRoot>
      <ReactNativeRecoilPersistGate store={ReactNativeRecoilPersist}>
        <PaperProvider>
          <ThemeProvider theme={theme}>
            <NavigationContainer>
              <RootNavigation />
              <StatusBar style="dark" />
              <ModalBase />
            </NavigationContainer>
          </ThemeProvider>
        </PaperProvider>
      </ReactNativeRecoilPersistGate>
    </RecoilRoot>
  );
};

export default App;
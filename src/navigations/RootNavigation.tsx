import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRecoilValue } from "recoil";
import { userState } from "../states/authState";
import AuthNavigation from "./auth/AuthStack";
import OthersTabs from "./OthersTabs";
import RootTabs from "./RootTabs";

const RootStack = createNativeStackNavigator();

const RootNavigation = () => {
  const user = useRecoilValue(userState);

  return (
    <RootStack.Navigator
      initialRouteName={user ? "OthersBottomTabs" : "AuthStack"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="AuthStack" component={AuthNavigation} />
      {/* 리팩토링 이전에 쓰던 것 */}
      {/* <RootStack.Screen name="RootBottomTabs" component={RootTabs} /> */}
      <RootStack.Screen name="OthersBottomTabs" component={OthersTabs} />
    </RootStack.Navigator>
  );
};

export default RootNavigation;

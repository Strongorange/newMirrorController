import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRecoilValue } from "recoil";
import Login from "../screens/auth/Login";
import { userState } from "../states/authState";
import RootStacks from "./RootStacks";
import RootTabs from "./RootTabs";

const RootStack = createNativeStackNavigator();

const RootNavigation = () => {
  const user = useRecoilValue(userState);

  return (
    <RootStack.Navigator
      initialRouteName={user ? "RootBottomTabs" : "Login"}
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen name="Login" component={Login} />
      <RootStack.Screen name="RootBottomTabs" component={RootTabs} />
    </RootStack.Navigator>
  );
};

export default RootNavigation;

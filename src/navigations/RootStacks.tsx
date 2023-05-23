import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/auth/Login";

const RootStacksNav = createNativeStackNavigator();

const RootStacks = () => {
  return (
    <RootStacksNav.Navigator>
      <RootStacksNav.Screen name="Login" component={Login} />
    </RootStacksNav.Navigator>
  );
};

export default RootStacks;

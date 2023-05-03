import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";

const RootStacksNav = createNativeStackNavigator();

const RootStacks = () => {
  return (
    <RootStacksNav.Navigator>
      <RootStacksNav.Screen name="StackOne" component={Home} />
    </RootStacksNav.Navigator>
  );
};

export default RootStacks;

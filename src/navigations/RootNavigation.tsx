import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RootStacks from "./RootStacks";
import RootTabs from "./RootTabs";

const RootStack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="RootBottomTabs" component={RootTabs} />
      <RootStack.Screen name="RootStacks" component={RootStacks} />
    </RootStack.Navigator>
  );
};

export default RootNavigation;

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Messages from "../screens/Messages";

const BottomTabs = createBottomTabNavigator();

const RootTabs = () => {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="Home" component={Home} />
      <BottomTabs.Screen name="Messages" component={Messages} />
    </BottomTabs.Navigator>
  );
};

export default RootTabs;

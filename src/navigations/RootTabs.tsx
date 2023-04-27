import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Messages from "../screens/Messages";
import Icon from "react-native-vector-icons/Ionicons";

const BottomTabs = createBottomTabNavigator();

const RootTabs = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          if (route.name === "Photos") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Messages") {
            iconName = focused
              ? "chatbox-ellipses"
              : "chatbox-ellipses-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <BottomTabs.Screen name="Photos" component={Home} />
      <BottomTabs.Screen name="Messages" component={Messages} />
    </BottomTabs.Navigator>
  );
};

export default RootTabs;

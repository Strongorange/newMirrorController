import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Messages from "../screens/Messages";
import Icon from "react-native-vector-icons/Ionicons";
import Settings from "../screens/Settings";
import HomeOthers from "../screens/HomeOthers";

const BottomTabs = createBottomTabNavigator();

const OthersTabs = () => {
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
      <BottomTabs.Screen name="Photos" component={HomeOthers} />
      <BottomTabs.Screen name="Messages" component={Messages} />
      <BottomTabs.Screen name="Settings" component={Settings} />
    </BottomTabs.Navigator>
  );
};

export default OthersTabs;

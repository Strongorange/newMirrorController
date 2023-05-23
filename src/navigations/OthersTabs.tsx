import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Messages from "../screens/Messages";
import Icon from "react-native-vector-icons/Ionicons";
import Settings from "../screens/Settings";
import HomeOthers from "../screens/HomeOthers";
import MessagesNavigation from "./messages/MessagesStack";
import Location from "../screens/location/Location";
import LocationNavigation from "./location/LocationStack";
import { MD3Colors } from "react-native-paper";

const BottomTabs = createBottomTabNavigator();

const OthersTabs = () => {
  return (
    <BottomTabs.Navigator
      initialRouteName="Photos"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          if (route.name === "Photos") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Messages") {
            iconName = focused
              ? "chatbox-ellipses"
              : "chatbox-ellipses-outline";
          } else if (route.name === "LocationStack") {
            iconName = focused ? "location" : "location-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFBFF",
        },
        tabBarLabel: () => null,
        tabBarActiveTintColor: MD3Colors.primary60,
        headerStyle: {
          backgroundColor: "#FFFBFF",
        },
      })}
    >
      <BottomTabs.Screen name="Photos" component={HomeOthers} />
      {/* <BottomTabs.Screen name="Messages" component={Messages} /> */}
      <BottomTabs.Screen name="Messages" component={MessagesNavigation} />
      <BottomTabs.Screen
        name="LocationStack"
        options={{ title: "Location" }}
        component={LocationNavigation}
      />
      <BottomTabs.Screen name="Settings" component={Settings} />
    </BottomTabs.Navigator>
  );
};

export default OthersTabs;

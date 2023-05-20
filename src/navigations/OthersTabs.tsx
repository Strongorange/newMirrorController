import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Messages from "../screens/Messages";
import Icon from "react-native-vector-icons/Ionicons";
import Settings from "../screens/Settings";
import HomeOthers from "../screens/HomeOthers";
import MessagesNavigation from "./messages/MessagesStack";
import Location from "../screens/location/Location";
import LocationNavigation from "./location/LocationStack";

const BottomTabs = createBottomTabNavigator();

const OthersTabs = () => {
  return (
    <BottomTabs.Navigator
      //FIXME: DB 사용량 아끼기 위해서 Messages로 변경 개발 완료 후 Photos로 변경
      initialRouteName="LocationStack"
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
        headerShown: false,
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

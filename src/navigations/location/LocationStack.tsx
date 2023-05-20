import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Location from "../../screens/location/Location";

type StackParamList = {
  Location: undefined;
};

const LocationStack = createNativeStackNavigator<StackParamList>();

const LocationNavigation = () => {
  return (
    <LocationStack.Navigator>
      <LocationStack.Screen name="Location" component={Location} />
    </LocationStack.Navigator>
  );
};

export default LocationNavigation;

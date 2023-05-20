import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddStation from "../../screens/location/AddStation";
import Location from "../../screens/location/Location";

type StackParamList = {
  Location: undefined;
  AddStation: undefined;
};

const LocationStack = createNativeStackNavigator<StackParamList>();

const LocationNavigation = () => {
  return (
    <LocationStack.Navigator>
      <LocationStack.Screen name="Location" component={Location} />
      <LocationStack.Screen name="AddStation" component={AddStation} />
    </LocationStack.Navigator>
  );
};

export default LocationNavigation;

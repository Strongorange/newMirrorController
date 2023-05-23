import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screens/auth/Login";
import SignUp from "../../screens/auth/SignUp";

type StackParamList = {
  Login: undefined;
  SignUp: undefined;
};

const AuthStack = createNativeStackNavigator<StackParamList>();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: "#FFFBFF" } }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;

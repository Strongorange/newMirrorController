import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Messages from "../../screens/Messages";
import MessagesCRUD from "../../screens/messages/MessagesCRUD";

const MessagesStack = createNativeStackNavigator();

const MessagesNavigation = () => {
  return (
    <MessagesStack.Navigator>
      <MessagesStack.Screen name="MessagesMain" component={Messages} />
      <MessagesStack.Screen name="MessagesCRUD" component={MessagesCRUD} />
    </MessagesStack.Navigator>
  );
};

export default MessagesNavigation;

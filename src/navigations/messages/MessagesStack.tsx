import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Messages from "../../screens/Messages";
import MessagesCRUD from "../../screens/messages/MessagesCRUD";
import { MessagesType } from "../../types/messagesTypes";

type StackParamList = {
  MessagesMain: undefined;
  MessagesCRUD: {
    key: keyof MessagesType;
  };
};

const MessagesStack = createNativeStackNavigator<StackParamList>();

const MessagesNavigation = () => {
  return (
    <MessagesStack.Navigator screenOptions={{ headerShown: false }}>
      <MessagesStack.Screen name="MessagesMain" component={Messages} />
      <MessagesStack.Screen name="MessagesCRUD" component={MessagesCRUD} />
    </MessagesStack.Navigator>
  );
};

export default MessagesNavigation;

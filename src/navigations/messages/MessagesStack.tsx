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
    <MessagesStack.Navigator>
      <MessagesStack.Screen
        name="MessagesMain"
        options={{ title: "Message" }}
        component={Messages}
      />
      <MessagesStack.Screen name="MessagesCRUD" component={MessagesCRUD} />
    </MessagesStack.Navigator>
  );
};

export default MessagesNavigation;

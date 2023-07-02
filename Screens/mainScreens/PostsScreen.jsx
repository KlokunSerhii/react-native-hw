import DefaultScreenPost from "../nestedScreens/DefaultScreenPost";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreens from "../nestedScreens/MapScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const NestedScreen = createStackNavigator();

const PostsScreens = () => {
  const navigation = useNavigation();

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Default"
        component={DefaultScreenPost}
        options={() => ({
          headerTitle: "Публікації",
          headerTitleAlign: "center",
          headerStyle: {
            height: 88,
            backgroundColor: "#FFF",
          },
          headerTitleStyle: {
            fontFamily: "RobotoMono-Regular",
            fontSize: 20,
          },
          headerTintColor: "#212121",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20, width: 20, height: 20 }}
              onPress={() => navigation.navigate("Login")}
            >
              <Feather name="log-out" size={20} color="rgba(33, 33, 33, 0.8)" />
            </TouchableOpacity>
          ),
        })}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={() => ({
          headerTitle: "Коментарі",
          headerTitleAlign: "center",
          headerStyle: {
            height: 88,
            backgroundColor: "#FFF",
          },
          headerTitleStyle: {
            fontFamily: "RobotoMono-Regular",
            fontSize: 20,
          },
          headerTintColor: "#212121",
        })}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreens}
        options={() => ({
          headerTitle: "Мапа",
          headerTitleAlign: "center",
          headerStyle: {
            height: 88,
            backgroundColor: "#FFF",
          },
          headerTitleStyle: {
            fontFamily: "RobotoMono-Regular",
            fontSize: 20,
          },
          headerTintColor: "#212121",
        })}
      />
    </NestedScreen.Navigator>
  );
};
export default PostsScreens;

import { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";
import { Feather, EvilIcons } from "@expo/vector-icons";
import foto from "../../assets/image/Rectangle.png";
import { useNavigation } from "@react-navigation/native";

function DefaultScreenPost({ route }) {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params) setPosts((prev) => [...prev, route.params]);
  }, [route.params]);
  return (
    <View style={styles.container}>
      {!foto ? (
        <View></View>
      ) : (
        <View style={styles.avatar}>
          <Image source={foto} style={styles.avatarImage} />
          <View style={{ marginLeft: 10 }}>
            <Text>Name User</Text>
            <Text>email@gmail.com</Text>
          </View>
        </View>
      )}

      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.list}>
            <Image source={{ uri: item.photo }} style={styles.Image} />
            <View style={styles.labelPhoto}>
              <Text style={styles.labelText}>{item.text}</Text>
            </View>
            <View style={styles.infoPhoto}>
              <TouchableOpacity
                style={styles.textlocation}
                onPress={() => {
                  navigation.navigate("Comments", item.photo);
                }}
              >
                <Feather name="message-circle" size={24} color="#BDBDBD" />
                <Text style={{ ...styles.text, color: "#BDBDBD" }}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.textlocation}
                onPress={() => {
                  navigation.navigate("Map", item.location);
                }}
              >
                <EvilIcons name="location" size={24} color="#BDBDBD" />
                <Text style={{ ...styles.text, color: "#212121" }}>
                  {item.locationText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

export default DefaultScreenPost;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0FFF0",
  },
  Image: {
    height: 240,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  list: {
    marginTop: 16,
  },
  textlocation: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  avatar: {
    marginHorizontal: 16,
    marginTop: 32,
    marginBottom: 16,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  infoPhoto: {
    marginTop: 8,
    marginHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  labelPhoto: {
    marginTop: 8,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: "RobotoMono-Regular",
    marginLeft: 5,
  },
  labelText: {
    fontSize: 16,
    fontFamily: "RobotoMono-Regular",
  },
});

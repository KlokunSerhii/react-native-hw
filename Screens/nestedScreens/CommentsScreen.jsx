import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
} from "react-native";
import { Feather } from "@expo/vector-icons";

function CommentsScreen({ route }) {
  const [isFocus, setIsFocus] = useState({
    send: false,
  });
  const [photo, setPhoto] = useState("");
  const [message, setMessage] = useState("");
  const [sendMessage, setSendMessage] = useState({});

  const send = () => {
    setSendMessage(message);
  };
  useEffect(() => {
    setPhoto(route.params);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <Image source={{ uri: photo }} style={styles.Image} />
      </View>
      <FlatList
        data={sendMessage}
        renderItem={({ item }) => (
          <View style={{ width: 100 }}>
            <Text>{item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        placeholderTextColor={"#BDBDBD"}
        placeholder={"Коментувати..."}
        style={{
          ...styles.input,
          borderColor: isFocus.send ? "#FF6C00" : "#F6F6F6",
          backgroundColor: isFocus.send ? "#FFFFFF" : "#F6F6F6",
        }}
        selectionColor={"#FF6C00"}
        onFocus={() => {
          setIsFocus({
            ...isFocus,
            send: true,
          });
        }}
        onBlur={() => {
          setIsFocus({
            ...isFocus,
            send: false,
          });
        }}
        onChangeText={setMessage}
      />
      <TouchableOpacity style={styles.iconBtn} onPress={send}>
        <Feather name="send" size={18} color="#fff" style={styles.iconSend} />
      </TouchableOpacity>
    </View>
  );
}
export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  input: {
    alignItems: "center",
    marginHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 20,
    padding: 12,
    color: "#212121",
    fontSize: 15,
    marginBottom: 10,
  },
  iconSend: {},
  iconBtn: {
    position: "absolute",
    right: 20,
    bottom: 15,
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "#FF6C00",
    backgroundColor: "#FF6C00",
    justifyContent: "center",
  },
  Image: {
    height: 240,
    marginHorizontal: 16,
    borderRadius: 8,
  },
});

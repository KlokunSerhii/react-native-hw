import { useState, useEffect } from "react";
import {
  TouchableWithoutFeedback,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
  Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";

function CommentsScreen({ route }) {
  const [isFocus, setIsFocus] = useState({
    send: false,
  });
  const [commentsList, setCommentsList] = useState("");
  const [message, setMessage] = useState("");

  const { userId, login } = useSelector((state) => state.auth);
  const { postId, photo } = route.params;

  useEffect(() => {
    getCommentsList();
  }, []);

  const createComments = async () => {
    const uniqName = Date.now().toString();
    await setDoc(doc(db, "posts", postId, "comments", uniqName), {
      login,
      message,
      userId,
      createdAt: commentDate(),
    });
    keyboardHide();
  };

  const getCommentsList = async () => {
    const querySnapshot = await getDocs(
      collection(db, "posts", postId, "comments")
    );
    if (querySnapshot) {
      setCommentsList(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    }
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.list}>
          <Image source={{ uri: photo }} style={styles.Image} />
        </View>
        <FlatList
          data={commentsList}
          renderItem={({ item }) => (
            <View style={{ width: 100 }}>
              <Text style={styles.login}>{item.login}</Text>
              <View style={styles.commentTextContainer}>
                <Text style={styles.commentText}>{item.message}</Text>
                <Text style={styles.commentDate}>{item.createdAt}</Text>
              </View>
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
          onChangeText={(value) => setMessage(value)}
        />
        <TouchableOpacity style={styles.iconBtn} onPress={createComments}>
          <Feather name="send" size={18} color="#fff" style={styles.iconSend} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
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
  commentText: {
    fontFamily: "RobotoMono-Regular",
    fontSize: 13,
    color: "#212121",
  },

  commentDate: {
    fontFamily: "RobotoMono-Regular",
    fontSize: 10,
    color: "#bdbdbd",
  },
});

const commentDate = () => {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hours = date.getHours();
  let min = date.getMinutes();

  if (day.length === 1) {
    day = "0" + day;
  }

  if (month.length === 1) {
    month = "0" + month;
  }

  if (hours.length === 1) {
    hours = "0" + hours;
  }

  if (min.length === 1) {
    min = "0" + min;
  }

  return `${day} ${month} ${year} | ${hours}:${min}`;
};

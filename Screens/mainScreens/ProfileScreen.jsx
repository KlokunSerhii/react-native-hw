import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";

import foto from "../../assets/image/Rectangle.png";
import { EvilIcons, Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import img from "../../assets/image/img-bg.png";

const ProfileScreen = () => {
  const [posts, setPosts] = useState([]);
  const userId = useSelector((state) => state.auth.userId);
  const user = useSelector((state) => state.auth.login);
  const navigation = useNavigation();

  const getPosts = async () => {
    try {
      const ref = collection(db, "posts");
      const filter = query(ref, where("userId", "==", userId));
      onSnapshot(filter, (snapshot) => {
        const posts = [];
        snapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        posts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(posts);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateLikes = async (likes, itemId) => {
    try {
      const likeRef = doc(db, "posts", itemId);
      await updateDoc(likeRef, {
        likes,
      });
    } catch (error) {
      console.log("err", error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <ImageBackground style={styles.imgBg} source={img}>
      <View style={styles.box}>
        {!foto ? (
          <View></View>
        ) : (
          <View style={styles.avatar}>
            <Image source={foto} style={styles.avatarImage} />
            {!foto ? (
              <TouchableOpacity style={styles.btnAddAvatar} activeOpacity={0.9}>
                <Ionicons name="add" size={20} color="#FF6C00" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.btnRemoveAvatar}
                activeOpacity={0.9}
              >
                <Ionicons name="close" size={20} color="#E8E8E8" />
              </TouchableOpacity>
            )}
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 30, fontFamily: "RobotoMono-Regular" }}>
                {user}
              </Text>
            </View>
          </View>
        )}
        <View style={{ marginTop: 110 }}>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <View style={styles.list}>
                <Image source={{ uri: item.photo }} style={styles.Image} />
                <View style={styles.labelPhoto}>
                  <Text style={styles.labelText}>{item.text}</Text>
                </View>
                <View style={styles.infoPhoto}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    <TouchableOpacity
                      style={styles.textlocation}
                      onPress={() => {
                        navigation.navigate("Comments", {
                          id: item.id,
                          photo: item.photo,
                        });
                      }}
                    >
                      <Feather
                        name="message-circle"
                        size={24}
                        color="#BDBDBD"
                      />
                      <Text style={{ ...styles.text, color: "#BDBDBD" }}>
                        0
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ marginLeft: 10 }}
                      onPress={() => {
                        updateLikes(item.likes + 1, item.id);
                      }}
                    >
                      <Feather
                        name="thumbs-up"
                        size={24}
                        color={item.likes > 0 ? "#FF6C00" : "#BDBDBD"}
                        style={{ marginRight: 10 }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        ...styles.text,
                        color: item.likes > 0 ? "#FF6C00" : "#BDBDBD",
                      }}
                    >
                      {item.likes}
                    </Text>
                  </View>

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
      </View>
    </ImageBackground>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
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
  imgBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  box: {
    position: "relative",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 100,
    backgroundColor: "#FFFFFF",
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  avatar: {
    position: "absolute",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    top: -60,
    alignSelf: "center",
    marginHorizontal: "auto",
    width: 120,
    height: 120,
  },
  btnAddAvatar: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#FF6C00",
  },
  btnRemoveAvatar: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
  },
});

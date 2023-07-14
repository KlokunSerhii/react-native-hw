import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { selectUserId, selectUserMail, selectUserName } from "../../redux/selectors"

import foto from "../../assets/image/Rectangle.png";

const ProfileScreen = () => {

    const [posts, setPosts] = useState([]);
    const userId = useSelector((state) => state.auth.userId);
    const userName = useSelector((state) => state.auth.login);
    const userMail = useSelector((state) => state.auth.email);

    const getPosts = async () => {
        try {
            const ref = collection(db, "posts");
            const filter = query(ref, where('userId', '==', userId))
            onSnapshot(filter, (snapshot) => {
                const posts = [];
                snapshot.forEach((doc) => {
                    posts.push({ ...doc.data(), id: doc.id });
                });
                posts.sort((a, b) => b.createdAt - a.createdAt)
                setPosts(posts);
            });
        } catch (error) {
        }
    }

    useEffect(() => {
        getPosts()
    }, []);

    return (
        <View style={styles.container}>
      {!foto ? (
        <View></View>
      ) : (
        <View style={styles.avatar}>
          <Image source={foto} style={styles.avatarImage} />
          <View style={{ marginLeft: 10 }}>
            <Text>{user}</Text>
            <Text>{email}</Text>
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
                  navigation.navigate("Comments", {
                    id: item.id,
                    photo: item.photo,
                  });
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    profile: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    name: {
        fontSize: 24,
    },
    mail: {
        color: 'gray'
    }
});

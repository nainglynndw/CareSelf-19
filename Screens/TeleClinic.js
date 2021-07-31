import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "../config/firebase";

const TeleClinic = () => {
  const [data, setData] = useState([]);

  const db = firebase.firestore().collection("TeleClinic");

  const fetchData = () => {
    db.onSnapshot((query) => {
      const data = [];
      query.forEach((doc) => {
        data.push({
          ...doc.data(),
          key: doc.id,
        });
        setData(data);
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.header}>
          <Image
            style={styles.img}
            source={{
              uri: item.image,
            }}
          />

          <Text style={styles.title}>{item.name}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.text}>" {item.note} "</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={styles.icon}
              onPress={() => {
                Linking.openURL("fb://page/" + item.pageId);
              }}
            >
              <MaterialCommunityIcons
                name="facebook"
                size={42}
                color="#3b5998"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => {
                Linking.openURL("https://m.me/" + item.pageId);
              }}
            >
              <MaterialCommunityIcons
                name="facebook-messenger"
                size={42}
                color="#0084ff"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default TeleClinic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#eee",
  },
  itemContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 5,
    padding: 5,
    width: "100%",
    borderColor: "lightblue",
    borderWidth: 3,
    marginVertical: 5,
  },
  header: {
    padding: 5,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },

  img: {
    resizeMode: "contain",
    width: 50,
    height: 50,
    borderRadius: 500,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#18648c",
  },
  body: {
    width: "100%",
    padding: 5,
  },
  text: {
    fontSize: 14,
    color: "#2b2b2b",
    fontWeight: "bold",
    alignSelf: "center",
  },
  icon: {
    marginHorizontal: 15,
  },
});

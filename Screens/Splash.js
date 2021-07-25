import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, ActivityIndicator, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";

const Splash = ({ navigation }) => {
  const db = SQLite.openDatabase("patient"); // returns Database object
  useEffect(() => {
    const makeTable = () => {
      db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, time TEXT, spo2 TEXT, o2supply  TEXT, temp TEXT, pr TEXT,bp TEXT, rr TEXT, bsl TEXT, med TEXT , food TEXT, snr TEXT)"
        );
      });
    };
    return () => makeTable();
  }, []);

  const [loading, setloading] = useState(true);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("patientProfile");
      setTimeout(() => {
        if (jsonValue == null) {
          navigation.reset({
            index: 0,
            routes: [{ name: "SetupProfile" }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        }
      }, 3000);
    } catch (e) {
      console.log("Error :" + e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/splash.png")}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      />
      {loading === true ? (
        <View style={{ position: "absolute", top: 100 }}>
          <ActivityIndicator animating={loading} color="#33548a" size={50} />
          <Text> Loading Data .... </Text>
        </View>
      ) : (
        false
      )}
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

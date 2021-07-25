import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Linking,
  SectionList,
  StatusBar,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import firebase from "../config/firebase";
import * as SQLite from "expo-sqlite";
import { ScrollView } from "react-native-gesture-handler";

const Home = ({ navigation }) => {
  const db = SQLite.openDatabase("patient"); // returns Database object
  const [profile, setprofile] = useState({});
  const current = parseFloat(Constants.manifest.version);
  const server = firebase.firestore().collection("Version").doc("Version");
  const [newData, setnewData] = useState([]);

  const fetchData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM items",
        null,
        (txObj, ResultSet) => {
          let res = ResultSet.rows._array.reduce((re, o) => {
            let existObj = re.find((obj) => obj.title === o.date);
            if (existObj) {
              existObj.data.push(o);
            } else {
              re.push({
                title: o.date,
                data: [o],
              });
            }
            return re;
          }, []);
          setnewData(res);
        },
        (txObj, error) => console.log("Error", error)
      );
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    server.get().then((query) => {
      const latest = parseFloat(query.data().Latest_Version);
      if (current < latest) {
        Alert.alert(
          "Update Now ?",
          "Update Version " + latest + " is Available ",
          [
            {
              text: "No",
            },

            {
              text: "Yes",
              onPress: () => {
                Linking.openURL(query.data().DownloadLink);
              },
            },
          ]
        );
      }
    });
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("patientProfile");
        jsonValue != null ? setprofile(JSON.parse(jsonValue)) : null;
      } catch (e) {
        console.log("Error :" + e);
      }
    };
    getData();
  }, []);

  // const resetData = () => {
  //   db.exec([{ sql: "PRAGMA foreign_keys = OFF;", args: [] }], false, () =>
  //     console.log("Foreign keys turned off")
  //   );

  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "DROP TABLE items",
  //       null,
  //       (txObj, resultSet) => console.log(resultSet.rowsAffected),
  //       (txObj, error) => console.log("Error", error)
  //     );
  //   });

  //   db.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () =>
  //     console.log("Foreign keys turned on")
  //   );
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, time TEXT, spo2 TEXT, o2supply  TEXT, temp TEXT, pr TEXT,bp TEXT, rr TEXT, bsl TEXT, med TEXT , food TEXT, snr TEXT)"
  //     );
  //   });
  // };

  // const delData = ({ title }) => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "DELETE FROM items WHERE id = ?",
  //       [title.id],
  //       (txObj, resultSet) => console.log(resultSet.rowsAffected),
  //       (txObj, error) => console.log(error)
  //     );
  //   });
  // };

  const Item = ({ title }) => {
    const delData = () => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM items WHERE id = ?",
          [title.id],
          (txObj, resultSet) => console.log(resultSet.rowsAffected),
          (txObj, error) => console.log(error)
        );
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    };

    return (
      <View style={styles.itemContainer}>
        <Text
          style={{
            fontWeight: "bold",
            color: "darkred",
            textDecorationLine: "underline",
          }}
        >
          {title.time}
        </Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.itemData}>
            <Text style={styles.itemDataTitle}>O2 Level</Text>
            <Text
              style={
                parseInt(title.spo2) <= 95
                  ? [styles.itemDataData, { color: "darkred" }]
                  : styles.itemDataData
              }
            >
              {title.spo2}
            </Text>
            <Text style={styles.itemDataUnit}>( % )</Text>
          </View>
          <View style={styles.itemData}>
            <Text style={styles.itemDataTitle}>O2 Supply</Text>

            <Text style={styles.itemDataData}>{title.o2supply}</Text>
            <Text style={styles.itemDataUnit}>( LPM )</Text>
          </View>
          <View style={styles.itemData}>
            <Text style={styles.itemDataTitle}>Temperature</Text>

            <Text
              style={
                parseFloat(title.temp) >= 98.7
                  ? [styles.itemDataData, { color: "darkred" }]
                  : styles.itemDataData
              }
            >
              {title.temp}
            </Text>
            <Text style={styles.itemDataUnit}>( C )</Text>
          </View>
          <View style={styles.itemData}>
            <Text style={styles.itemDataTitle}>Pulse Rate</Text>

            <Text style={styles.itemDataData}>{title.pr}</Text>
            <Text style={styles.itemDataUnit}>( BPM )</Text>
          </View>

          <View style={styles.itemData}>
            <Text style={styles.itemDataTitle}>Blood Pressure</Text>
            <Text style={styles.itemDataData}>{title.bp}</Text>
            <Text style={styles.itemDataUnit}>( mmHg )</Text>
          </View>
          <View style={styles.itemData}>
            <Text style={styles.itemDataTitle}>Respiratory Rate</Text>
            <Text style={styles.itemDataData}>{title.rr}</Text>
            <Text style={styles.itemDataUnit}>( BPM )</Text>
          </View>
          <View style={styles.itemData}>
            <Text style={styles.itemDataTitle}>Blood Sugar Level</Text>

            <Text style={styles.itemDataData}>{title.bsl}</Text>
            <Text style={styles.itemDataUnit}>( mg/dL )</Text>
          </View>

          <View style={styles.itemData}>
            <Text style={styles.itemDataTitle}>ဆေး</Text>

            <Text style={styles.itemDataData}>{title.med}</Text>
          </View>
          <View style={styles.itemData}>
            <Text style={styles.itemDataTitle}>အစာ</Text>
            <Text style={styles.itemDataData}>{title.food}</Text>
          </View>
          <View style={styles.itemData}>
            <Text style={styles.itemDataTitle}>ရောဂါလက္ခဏာ</Text>
            <Text style={styles.itemDataData}>{title.snr}</Text>
          </View>
          <Button
            title="Delete Data"
            color="darkred"
            onPress={() => delData()}
          />
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.headerText}>
              Name - <Text style={{ color: "#ff8f05" }}>{profile.name}</Text>
            </Text>
            <Text style={styles.headerText}>
              Age - <Text style={{ color: "#ff8f05" }}>{profile.age}</Text>
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.headerText}>
              လက္ခဏာစပြသည့်နေ့ -{" "}
              <Text style={{ color: "#ff8f05" }}>{profile.symptomDate}</Text>
            </Text>
            <Text style={styles.headerText}>
              Test Result ထွက်သည့်နေ့ -{" "}
              <Text style={{ color: "#ff8f05" }}>{profile.resultDate}</Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <ScrollView horizontal={true}>
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.headerText}>
                ရောဂါအခံ -{" "}
                <Text style={{ color: "#ff8f05" }}>
                  {profile.underlineDisease}
                </Text>
              </Text>
              <Text style={styles.headerText}>
                ကနဦး လက္ခဏာ -{" "}
                <Text style={{ color: "#ff8f05" }}>{profile.initSymptom}</Text>
              </Text>
            </View>

            <View
              style={{
                marginLeft: 50,
              }}
            >
              <Text style={styles.headerText}>
                သောက်နေကျဆေး -{" "}
                <Text style={{ color: "#ff8f05" }}>{profile.usedToDrug}</Text>
              </Text>
              <Text style={styles.headerText}>
                မတည့်သည့်ဆေး-{" "}
                <Text style={{ color: "#ff8f05" }}>{profile.allergicDrug}</Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{ flex: 1, width: "100%" }}>
        <SectionList
          sections={newData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item title={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.dataContainer}>
              <Text style={{ fontWeight: "bold", color: "#186480" }}>
                {" "}
                Date - {title}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: StatusBar.currentHeight + 5,
    backgroundColor: "#eee",
  },
  header: {
    backgroundColor: "#18648c",
    elevation: 8,
    padding: 5,
    justifyContent: "center",
  },
  footer: {
    width: "100%",
    backgroundColor: "#18648c",
    elevation: 8,
    padding: 5,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 13,
    color: "#eee",
    fontWeight: "bold",
    marginVertical: 5,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemContainer: {
    width: "100%",

    backgroundColor: "#fff",
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderRadius: 5,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  dataContainer: {
    width: "100%",
    backgroundColor: "lightgreen",
    padding: 5,
    marginTop: 5,
  },
  itemData: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    margin: 5,
    elevation: 5,
    backgroundColor: "lightblue",
    padding: 3,
  },
  itemDataTitle: {
    fontWeight: "bold",
    fontSize: 12,
    marginHorizontal: 5,
  },
  itemDataData: {
    fontWeight: "bold",
    color: "green",
  },
  itemDataUnit: {
    fontSize: 12,
  },
});

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
  Dimensions,
  StatusBar,
} from "react-native";
import * as SQLite from "expo-sqlite";

const AddData = ({ navigation }) => {
  const currentDate = new Date();
  console.log(currentDate.toLocaleTimeString());

  const db = SQLite.openDatabase("patient"); // returns Database object
  const [date, setDate] = useState(currentDate.toLocaleDateString());
  const [time, setTime] = useState(currentDate.toLocaleTimeString());
  const [spo2, setSpo2] = useState("");
  const [o2supply, setO2supply] = useState("");
  const [pr, setPr] = useState("");
  const [temp, setTemp] = useState("");
  const [rr, setRr] = useState("");
  const [bp, setBp] = useState("");
  const [med, setMed] = useState("");
  const [food, setFood] = useState("");
  const [snr, setSnr] = useState("");
  const [bsl, setBsl] = useState("");
  const [loading, setLoading] = useState(false);

  const save = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO items (date, time , spo2 , o2supply , temp , pr ,bp , rr , bsl , med , food , snr ) values (?, ? , ? ,? , ? ,? , ? ,? ,? ,? ,? ,?)",
        [date, time, spo2, o2supply, temp, pr, bp, rr, bsl, med, food, snr],
        (txObj, resultSet) => console.log(resultSet.rows._array),
        (txObj, error) => console.log("Error", error)
      );
    });
    setLoading(true);
    setLoading(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "Chart" }],
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View
          style={{
            backgroundColor: "#18648c",
            width: "95%",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "#eee",
              fontSize: 18,
              marginVertical: 20,
            }}
          >
            {" "}
            Fill Patient's Accurate Data{" "}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <Text style={styles.inputTitle}></Text>
            <Text style={styles.inputTitle}>Date - </Text>
            <TextInput
              defaultValue={date}
              placeholder="17.8.2021"
              style={styles.input}
              onChangeText={(text) => {
                setDate(text);
              }}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <Text style={styles.inputTitle}></Text>
            <Text style={styles.inputTitle}>Time - </Text>
            <TextInput
              defaultValue={currentDate.toLocaleTimeString()}
              placeholder="8:00 PM"
              style={styles.input}
              onChangeText={(text) => {
                setTime(text);
              }}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <Text style={styles.inputTitle}></Text>
            <Text style={styles.inputTitle}>O2 Level %- </Text>
            <TextInput
              placeholder="95"
              style={styles.input}
              onChangeText={(text) => {
                setSpo2(text);
              }}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <Text style={styles.inputTitle}></Text>
            <Text style={styles.inputTitle}>O2 Supply (lpm) - </Text>
            <TextInput
              placeholder="2"
              style={styles.input}
              onChangeText={(text) => {
                setO2supply(text);
              }}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <Text style={styles.inputTitle}></Text>
            <Text style={styles.inputTitle}>Pulse Rate (bpm)- </Text>
            <TextInput
              placeholder="75"
              style={styles.input}
              onChangeText={(text) => {
                setPr(text);
              }}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <Text style={styles.inputTitle}></Text>
            <Text style={styles.inputTitle}>Temperature ('C) - </Text>
            <TextInput
              placeholder="98"
              style={styles.input}
              onChangeText={(text) => {
                setTemp(text);
              }}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <Text style={styles.inputTitle}></Text>
            <Text style={styles.inputTitle}>
              Respiratory Rate - {"\n"} (bpm){" "}
            </Text>
            <TextInput
              placeholder="45"
              style={styles.input}
              onChangeText={(text) => {
                setRr(text);
              }}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <Text style={styles.inputTitle}></Text>
            <Text style={styles.inputTitle}>
              Blood Pressure - {"\n"} (mmHg){" "}
            </Text>
            <TextInput
              placeholder="120/80"
              style={styles.input}
              onChangeText={(text) => {
                setBp(text);
              }}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <Text style={styles.inputTitle}></Text>
            <Text style={styles.inputTitle}>
              Blood Sugar Level - {"\n"} (mg/dL){" "}
            </Text>
            <TextInput
              placeholder="100"
              style={styles.input}
              onChangeText={(text) => {
                setBsl(text);
              }}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <Text style={styles.inputTitle}></Text>
            <Text style={styles.inputTitle}>သောက်/ထိုး ဆေး - </Text>
            <TextInput
              placeholder="Paracetamol"
              style={styles.input}
              onChangeText={(text) => {
                setMed(text);
              }}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <Text style={styles.inputTitle}></Text>
            <Text style={styles.inputTitle}>အစာ - </Text>
            <TextInput
              placeholder="Ensure ,  ဆန်ပြုတ်"
              style={styles.input}
              onChangeText={(text) => {
                setFood(text);
              }}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <Text style={styles.inputTitle}></Text>
            <Text style={styles.inputTitle}>လက္ခဏာ - </Text>
            <TextInput
              placeholder="မော"
              style={styles.input}
              onChangeText={(text) => {
                setSnr(text);
              }}
            />
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Button
            title="Save Data"
            onPress={() => {
              save();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddData;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
  },
  inputContainer: {
    width: "95%",
    maxWidth: 400,
    marginVertical: 5,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "lightblue",
    borderBottomWidth: 2,
    paddingBottom: 3,
  },
  inputTitle: {
    fontWeight: "bold",
  },
  input: {
    width: "60%",
    maxWidth: 250,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 2,
    padding: 5,
    borderColor: "gray",
  },
});

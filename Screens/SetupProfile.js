import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SetupProfile = ({ navigation }) => {
  const [name, setname] = useState("");
  const [age, setage] = useState("");
  const [underlineDisease, setunderlineDisease] = useState("");
  const [usedToDrug, setusedToDrug] = useState("");
  const [allergicDrug, setallergicDrug] = useState("");
  const [resultDate, setresultDate] = useState("");
  const [symptomDate, setsymptomDate] = useState("");
  const [initSymptom, setinitSymptom] = useState("");

  const saveData = async (patientProfile) => {
    var patientProfile = {
      name: name,
      age: age,
      underlineDisease: underlineDisease,
      usedToDrug: usedToDrug,
      allergicDrug: allergicDrug,
      resultDate: resultDate,
      symptomDate: symptomDate,
      initSymptom: initSymptom,
    };
    try {
      const jsonValue = JSON.stringify(patientProfile);
      await AsyncStorage.setItem("patientProfile", jsonValue);
    } catch (e) {
      console.log("Error :" + e);
    }
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head}>လူနာအကြောင်းဖြည့်ပေးပါ</Text>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputHead}>အမည် - </Text>
          <View style={styles.inputSperator}></View>
          <TextInput
            style={styles.input}
            placeholder="မောင်ဘ / မမြ"
            onChangeText={(text) => {
              setname(text);
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputHead}>အသက် - </Text>
          <View style={styles.inputSperator}></View>
          <TextInput
            style={styles.input}
            placeholder="၅၀"
            onChangeText={(text) => {
              setage(text);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputHead}>ရောဂါအခံ - </Text>
          <View style={styles.inputSperator}></View>
          <TextInput
            multiline={true}
            style={styles.input}
            placeholder="သွေးတိုး / ဆီးချို"
            onChangeText={(text) => {
              setunderlineDisease(text);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputHead}>အမြဲသောက်နေကျဆေး - </Text>
          <View style={styles.inputSperator}></View>
          <TextInput
            style={styles.input}
            placeholder="Cetirizine"
            onChangeText={(text) => {
              setusedToDrug(text);
            }}
            multiline={true}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputHead}>မတည့်သည့်ဆေး - </Text>
          <View style={styles.inputSperator}></View>
          <TextInput
            style={styles.input}
            placeholder="ပင်နီစလင်"
            onChangeText={(text) => {
              setallergicDrug(text);
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputHead}>Test Result ထွက်သည့်နေ့ - </Text>
          <View style={styles.inputSperator}></View>
          <TextInput
            style={styles.input}
            placeholder="15.7.2021"
            onChangeText={(text) => {
              setresultDate(text);
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputHead}>လက္ခဏာစပြသည့်နေ့ - </Text>
          <View style={styles.inputSperator}></View>
          <TextInput
            style={styles.input}
            placeholder="13.7.2021"
            onChangeText={(text) => {
              setsymptomDate(text);
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputHead}>ကနဦး စသည့်လက္ခဏာ - </Text>
          <View style={styles.inputSperator}></View>
          <TextInput
            style={styles.input}
            placeholder="ဖျား (သို့) အနံ့ပျောက်"
            onChangeText={(text) => {
              setinitSymptom(text);
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            saveData();
          }}
        >
          <Text style={styles.btnText}>Save Data</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SetupProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
  },
  head: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0389ab",
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#eee",
    width: "90%",
    maxWidth: 400,
    padding: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    alignItems: "center",
    elevation: 8,
    overflow: "hidden",
  },
  inputHead: {
    fontWeight: "bold",
  },
  inputSperator: {
    height: "90%",
    borderLeftWidth: 2,
    marginHorizontal: 10,
  },
  input: {
    width: "50%",
    color: "#176087",
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: "#18648c",
    elevation: 8,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 30,
  },
  btnText: {
    color: "#eee",
  },
});

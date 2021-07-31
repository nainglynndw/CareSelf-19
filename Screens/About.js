import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Image,
  Linking,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const About = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>KBZ Pay --- 09-797780030</Text>
            <Text style={styles.modalText}>WAVE Pay --- 09-797780030</Text>
            <Text style={styles.modalText}>One Pay --- 09-797780030</Text>
            <Text style={styles.modalText}>AYA Pay --- 09-403944442</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Thank you for your support</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <Image source={require("../assets/covid.gif")} style={styles.img} />
      <View
        style={{
          backgroundColor: "#18648c",
          width: "100%",
          alignItems: "center",
          padding: 5,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 18, color: "#eee" }}>
          SelfCare - 19
        </Text>
        <Text style={{ color: "#eee" }}>v1.2</Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          margin: 5,
          padding: 5,
          marginBottom: 10,
        }}
      >
        <Text>
          For now , this app has features like - {"\n"}
          <Text style={{ color: "green", fontWeight: "bold" }}>
            {" "}
            - checking patient's Underline Data{"\n"} - Current Monitoring Data
            {"\n"} - Oxygen Plants' Locations {"\n"} - Medical Articles{"\n"} -
            Tele Clinic
          </Text>
        </Text>

        <Text style={{ marginTop: 10, fontWeight: "bold", marginVertical: 10 }}>
          " Your Health , Our Pleasure "
        </Text>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => {
            Linking.openURL("mailto://twinleaf01@gmail.com");
          }}
        >
          <MaterialCommunityIcons
            name="email-multiple"
            size={24}
            color="#EA4335"
          />
          <Text style={{ fontWeight: "bold", color: "blue", marginLeft: 10 }}>
            twinleaf01@gmail.com
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => {
            Linking.openURL("https://m.me/nainglynn.m3");
          }}
        >
          <FontAwesome5 name="facebook-messenger" size={24} color="#006AFF" />
          <Text style={{ fontWeight: "bold", color: "blue", marginLeft: 10 }}>
            m.me/nainglynn.m3
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={{
          marginTop: 20,
          marginBottom: 20,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: "#a15828",
          elevation: 8,
          borderRadius: 5,
        }}
      >
        <Text>Want to Support ?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
  },
  img: {
    width: (Dimensions.get("window").width * 8) / 10,
    height: (Dimensions.get("window").width * 8) / 10,
    resizeMode: "contain",
  },

  //   ------------------- Modal -----------------

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    justifyContent: "center",
    width: (Dimensions.get("window").width * 8) / 10,
    height: (Dimensions.get("window").width * 8) / 10,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    elevation: 4,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

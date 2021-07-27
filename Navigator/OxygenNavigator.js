import React from "react";
import Oxygen from "../Screens/Oxygen";
import TeleClinic from "../Screens/TeleClinic";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet, Text, View, StatusBar } from "react-native";

const Tab = createMaterialTopTabNavigator();

const OxygenNavigator = () => {
  return (
    <Tab.Navigator style={styles.container}>
      <Tab.Screen name="Oxygen" component={Oxygen} />
      <Tab.Screen name="Tele Clinic" component={TeleClinic} />
    </Tab.Navigator>
  );
};

export default OxygenNavigator;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
  },
});

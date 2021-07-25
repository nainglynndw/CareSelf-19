import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "../Screens/Home";
import About from "../Screens/About";
import AddData from "../Screens/AddData";
import { MaterialIcons } from "@expo/vector-icons";

const tab = createMaterialBottomTabNavigator();

export default function HomeNavigator() {
  return (
    <tab.Navigator
      initialRouteName="Home"
      activeColor="#18648c"
      inactiveColor="gray"
      barStyle={{ backgroundColor: "#eee" }}
    >
      <tab.Screen
        name="About"
        component={About}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="info" size={24} color={color} />;
          },
        }}
      />
      <tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="home" size={24} color={color} />;
          },
        }}
      />
      <tab.Screen
        name="AddData"
        component={AddData}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="add-circle" size={24} color={color} />;
          },
        }}
      />
    </tab.Navigator>
  );
}

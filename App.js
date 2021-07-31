import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeNavigator from "./Navigator/HomeNavigator";
import SetupProfile from "./Screens/SetupProfile";
import Splash from "./Screens/Splash";
import ArticleDetail from "./Screens/ArticleDetail";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SetupProfile" component={SetupProfile} />
        <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

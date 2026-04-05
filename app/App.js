import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContextProvider, useAuth } from "./src/hooks/useAuth";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import GetStartedScreen from "./src/screens/GetStartedScreen";
import SendHelloScreen from "./src/screens/SendHelloScreen";
import InsideScreen from "./src/screens/InsideScreen";
import OutsideScreen from "./src/screens/OutsideScreen";
import LedScreen from "./src/screens/LedScreen"

const Stack = createStackNavigator();

function AppNavigator() {
  const { user, isPending } = useAuth();

  if (isPending) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator initialRouteName={user ? "Home" : "GetStarted"}>
        <Stack.Screen
          name="GetStarted"
          options={{ headerShown: false }}
          component={GetStartedScreen}
        />
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Register"
          options={{ headerShown: false }}
          component={RegisterScreen}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="Hello"
          options={{ headerShown: false }}
          component={SendHelloScreen}
        />
        <Stack.Screen
          name="Inside"
          options={{ headerShown: false }}
          component={InsideScreen}
        />
        <Stack.Screen
          name="Outside"
          options={{ headerShown: false }}
          component={OutsideScreen}
        />
        <Stack.Screen
          name="Led"
          options={{ headerShown: false }}
          component={LedScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthContextProvider>
      <AppNavigator />
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import useHello from "../hooks/useHello";
import { useAuth } from "../hooks/useAuth";
import MenuButton from "../components/MenuButton";

export default function HomeScreen({ navigation }) {
  const { sendHelloToServer } = useHello();
  const [responseMessage, setResponseMessage] = useState("");

  const handleSendHello = async () => {
    const response = await sendHelloToServer();
    if (response) {
      setResponseMessage(response);
      Alert.alert("Response from server:", response);
    } else {
      Alert.alert("Error", "Failed to send hello world message.");
    }
  };

  const handleLogout = () => {
    logout();
    navigation.navigate("GetStarted");
  };

  const { user, logout } = useAuth();
  console.log(user);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome, {user?.name}</Text>
      <Text style={styles.subHeaderText}>Send Hello To Server Screen</Text>
      <MenuButton navigation={navigation} />

      <TouchableOpacity onPress={handleSendHello} style={styles.button}>
        <Text style={styles.buttonText}>Send Hello</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      {responseMessage ? (
        <Text style={styles.responseText}>{responseMessage}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
    padding: 20,
  },
  headerText: {
    color: "#333",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeaderText: {
    color: "#666",
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6200ea",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  responseText: {
    color: "#333",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
});

// src/screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Example icon library
import { useAuth } from "../hooks/useAuth";

export default function LoginScreen({ navigation }) {
  const { isPending, login } = useAuth();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (loginForm.email === "" || loginForm.password === "") {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    // Handle login logic here
    const result = await login(loginForm.email, loginForm.password);
    if (result.status) {
      Alert.alert("Success", result.message);
      // Navigate to the HomeScreen after successful login
      navigation.navigate("Home");
    } else {
      Alert.alert("Error", result.message);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/4.jpg")}
        style={styles.background}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Log in to your account</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              placeholderTextColor="#888"
              value={loginForm.email}
              onChangeText={(text) =>
                setLoginForm((prev) => ({
                  ...prev,
                  email: text,
                }))
              }
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Icon
              name="envelope"
              size={20}
              color="#888"
              style={styles.inputIcon}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              placeholderTextColor="#888"
              value={loginForm.password}
              onChangeText={(text) =>
                setLoginForm((prev) => ({
                  ...prev,
                  password: text,
                }))
              }
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={toggleShowPassword}>
              <Icon
                name={showPassword ? "unlock" : "lock"}
                size={20}
                color="#888"
                style={styles.inputIcon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.text}>
              Don't have an account?{" "}
              <Text style={styles.registerText}>Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    width: "85%",
    backgroundColor: "rgba(230, 230, 255, 0.5)", // Glass effect
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#4A148C",
  },
  subtitle: {
    fontSize: 18,
    color: "#4A148C",
    marginBottom: 32,
  },
  inputContainer: {
    backgroundColor: "#F1E7FA", //*
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#4A148C",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#7B1FA2",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    color: "#2E2933",
    fontSize: 15,
    marginTop: 20,
  },
  registerText: {
    color: "#3D007A",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 20,
  },
});

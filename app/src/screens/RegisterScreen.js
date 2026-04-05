// src/screens/RegisterScreen.js
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
import Icon from "react-native-vector-icons/FontAwesome";
import { useAuth } from "../hooks/useAuth";

export default function RegisterScreen({ navigation }) {
  const { isPending, register } = useAuth();
  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (
      userForm.username === "" ||
      userForm.email === "" ||
      userForm.password === "" ||
      confirmPassword === ""
    ) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }
    if (userForm.password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    // Handle register logic here
    const result = await register(
      userForm.username,
      userForm.email,
      userForm.password
    );
    if (result.status) {
      Alert.alert("Success", result.message);
      // Navigate to the Login after successful registration
      navigation.navigate("Login");
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
        source={require("../../assets/2.jpg")}
        style={styles.background}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              placeholderTextColor="#888"
              value={userForm.username}
              onChangeText={(text) =>
                setUserForm((prev) => ({
                  ...prev,
                  username: text,
                }))
              }
              autoCapitalize="words"
            />
            <Icon name="user" size={20} color="#888" style={styles.inputIcon} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              placeholderTextColor="#888"
              value={userForm.email}
              onChangeText={(text) =>
                setUserForm((prev) => ({
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
              value={userForm.password}
              onChangeText={(text) =>
                setUserForm((prev) => ({
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
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#888"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
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
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.text}>
              Already have an account?{" "}
              <Text style={styles.loginText}>Login</Text>
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
    backgroundColor: "#F1E7FA",
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
  loginText: {
    color: "#3D007A",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 20,
  },
});

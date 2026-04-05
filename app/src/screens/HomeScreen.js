// src/screens/HomeScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import MenuButton from "../components/MenuButton";
import { useAuth } from "../hooks/useAuth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();

  // Dummy data for rooms, devices, and controls
  const [rooms, setRooms] = useState([
    {
      name: "Inside",
      status: "All devices off",
      icon: "home-import-outline",
      to: "Inside",
    },
    {
      name: "Outside",
      status: "Lights on, Appliances off",
      icon: "home-export-outline",
      to: "Outside",
    },
  ]);

  const [controls, setControls] = useState([
    {
      name: "Humidity",
      icon: "water",
      action: () => alert("Humidity control triggered!"),
    },
    {
      name: "Temperature",
      icon: "thermometer",
      action: () => alert("Temperature control triggered!"),
    },
    {
      name: "Security",
      icon: "shield-lock-outline",
      action: () => alert("Security control triggered!"),
    },
  ]);

  const handleQuickAction = (action) => {
    alert(`${action} action triggered!`);
  };

  return (
    <ImageBackground
      source={require("../../assets/7.jpg")}
      style={styles.background}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome Back, {user?.username}</Text>
          <MenuButton navigation={navigation} />
        </View>

        <Text style={styles.sectionTitle}>Rooms</Text>
        {rooms.map((room, index) => (
          <TouchableOpacity
            key={index}
            style={styles.roomCard}
            onPress={() => navigation.navigate(`${room.to}`)}
          >
            <View style={styles.roomCardContent}>
              <Icon
                name={room.icon}
                size={24}
                color="#6A1B9A"
                style={styles.roomIcon}
              />
              <View>
                <Text style={styles.roomName}>{room.name}</Text>
                <Text style={styles.roomStatus}>{room.status}</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={20} color="#6A1B9A" />
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Control Panel</Text>
        <View style={styles.controlsContainer}>
          {controls.map((control, index) => (
            <TouchableOpacity
              key={index}
              style={styles.controlButton}
              onPress={control.action}
            >
              <Icon name={control.icon} size={24} color="#fff" />
              <Text style={styles.controlText}>{control.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => handleQuickAction("Turn on Lights")}
          >
            <Icon name="lightbulb-on-outline" size={24} color="#fff" />
            <Text style={styles.quickActionText}>Turn on Lights</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => handleQuickAction("Unlock Door")}
          >
            <Icon name="lock-open-outline" size={24} color="#fff" />
            <Text style={styles.quickActionText}>Unlock Door</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => handleQuickAction("Turn off All")}
          >
            <Icon name="power-off" size={24} color="#fff" />
            <Text style={styles.quickActionText}>Turn off All</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(106, 27, 154, 0.9)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 15,
    marginLeft: 20,
    color: "#ffffff",
  },
  roomCard: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roomCardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  roomIcon: {
    marginRight: 15,
  },
  roomName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A1B9A",
    marginBottom: 5,
  },
  roomStatus: {
    fontSize: 14,
    color: "#888",
  },
  quickActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  quickActionButton: {
    backgroundColor: "#6A1B9A",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
  },
  quickActionText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  controlButton: {
    backgroundColor: "#6A1B9A",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
  },
  controlText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
});

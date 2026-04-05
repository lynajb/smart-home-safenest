import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Vibration,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useLedControl from "../hooks/useLedControl";

export default function App() {
  const { controlLED } = useLedControl();
  const [isOn, setIsOn] = useState(false);
  const position = new Animated.Value(isOn ? 1 : 0);

  useEffect(() => {
    Animated.timing(position, {
      toValue: isOn ? 1 : 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [isOn]);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    controlLED(isOn ? "off" : "on");
    Vibration.vibrate(50);
  };

  const thumbPosition = position.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 10],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flashlight Control</Text>
      <Text style={[styles.status, { color: isOn ? "#0f0" : "#f00" }]}>
        {isOn ? "On" : "Off"}
      </Text>
      <View style={styles.switchContainer}>
        <LinearGradient
          colors={["#636362", "#292928"]}
          style={styles.switchBackground}
        >
          <TouchableOpacity
            style={styles.switch}
            onPress={toggleSwitch}
            activeOpacity={0.8}
          >
            <Animated.View style={[styles.thumb, { top: thumbPosition }]}>
              <LinearGradient
                colors={["#fff", "#ddd"]}
                style={styles.thumbBackground}
              />
            </Animated.View>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 20,
    fontWeight: "bold",
  },
  status: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  switchContainer: {
    width: 110,
    height: 190,
    borderRadius: 55,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
  },
  switchBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  switch: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  thumb: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
  },
  thumbBackground: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
  },
});

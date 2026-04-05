import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Video } from "expo-av"; // Import Video from expo-av

const GetStartedScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          source={require("../../assets/Smarthome.mp4")} // Replace with your video file
          rate={0.5}
          isMuted={true}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={styles.video}
        />
      </View>
      <View style={styles.contentContainer}>
        <Image
          source={require("../../assets/SafeNestLogo3.jpg")} // Replace with your image file
          style={styles.logo}
        />
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to SafeNest</Text>
          <Text style={styles.subtitle}>Your smart home, reimagined</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  videoContainer: {
    height: 500, // Adjust height as needed
    position: "relative",
    marginBottom: -100, // Negative margin to overlay content on top of video
  },
  video: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    zIndex: 1, // Ensure content is above video
    borderTopLeftRadius: 50, // More rounded top left corner
    borderTopRightRadius: 50, // More rounded top right corner
    backgroundColor: "#fff", // White background for content area
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center", // Center content horizontally
  },
  logo: {
    width: 200, // Adjust width as needed
    height: 100, // Adjust height as needed
    resizeMode: "contain", // Maintain aspect ratio
    marginTop: 20, // Spacing from top
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20, // Adjust spacing from logo
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4B0082", // Dark purple
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#8A2BE2", // Medium purple
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#9370DB", // Light purple
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GetStartedScreen;

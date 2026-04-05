# SafeNest – Smart Home IoT System 🏠

SafeNest is a full-stack smart home automation system developed during a summer internship at Alfa Computers & Consulting (2024).  
It enables real-time monitoring of environmental conditions and remote control of home devices through a mobile application.

## System Architecture
ESP8266 (Hardware) → Node.js REST API → MongoDB  
                                     ↑  
                             React Native App  

The system is structured into three layers:
- **Hardware layer**: ESP8266 collects sensor data and sends it via HTTP
- **Backend layer**: Node.js API processes data and manages authentication
- **Mobile layer**: React Native app for monitoring and device control

## Features
- Real-time monitoring (temperature, humidity, gas, water level)
- Remote control of devices (LED/relay)
- User authentication with JWT
- Sensor data logging and history
- Cross-platform mobile interface (Expo)

## Technologies Used
- ESP8266 (NodeMCU)
- Node.js & Express.js
- MongoDB
- React Native (Expo)
- REST API & JWT Authentication

## Project Structure
SafeNest/
├── hardware/ → ESP8266 firmware
├── api/ → Backend (Node.js)
└── app/ → Mobile app (React Native)

## Authors
- **Lina Jbara** 
- **Mohamed Ben Naima** 

---
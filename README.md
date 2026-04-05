SafeNest – Smart Home IoT System
Description

SafeNest is a smart home IoT system that allows users to monitor environmental data and control home devices remotely using a mobile application and a backend server.

The system uses an ESP8266 microcontroller to collect sensor data and send it to a Node.js backend, where data is stored in MongoDB and displayed in a React Native mobile application.

Technologies Used
ESP8266 (NodeMCU)
Node.js & Express.js
MongoDB
React Native (Expo)
REST API
JWT Authentication
Features
Real-time temperature and humidity monitoring
Gas and water level detection
Remote LED/device control
User authentication (JWT)
Sensor data storage and history
Mobile application for monitoring and control
System Architecture

ESP8266 → Node.js API → MongoDB → React Native App

Project Structure
SafeNest/
├── hardware/   → ESP8266 code
├── api/        → Backend (Node.js)
├── app/        → Mobile app (React Native)
Author

Lyna Jbara – IoT Student
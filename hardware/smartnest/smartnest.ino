#include <ESP8266WiFi.h>
#include <DHT.h>
#include <ArduinoJson.h>
#include <ESP8266HTTPClient.h>
#include <TimeLib.h> // Library for timestamp management

// WiFi credentials
char ssid[] = "ssid";
char pass[] = "password";

// Initialize DHT sensor
DHT DHT(D3, DHT22);

// Define pins for other sensors and actuators
#define Buzzer D0
#define MQ2 A0
#define trig D6
#define echo D5
#define relay1 D7
#define relay2 D8

WiFiClient wifiClient;

void setup() {
  Serial.begin(115200);

  // Initialize pin modes
  pinMode(Buzzer, OUTPUT);
  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);
  pinMode(relay1, OUTPUT);
  pinMode(relay2, OUTPUT);
  digitalWrite(relay1, HIGH); // Turn off relay 1 initially
  digitalWrite(relay2, HIGH); // Turn off relay 2 initially

  // Connect to WiFi
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
}

void loop() {
  // Read data from DHT sensor
  float h = DHT.readHumidity();
  float t = DHT.readTemperature();
  // Read data from MQ2 gas sensor
  int gasValue = analogRead(MQ2);
  gasValue = map(gasValue, 0, 1024, 0, 100);

  // Read data from ultrasonic sensor
  digitalWrite(trig, LOW);
  delayMicroseconds(4);
  digitalWrite(trig, HIGH);
  delayMicroseconds(10);
  digitalWrite(trig, LOW);
  long duration = pulseIn(echo, HIGH);
  long cm = duration / 29 / 2;

  // Check if reading from DHT sensor failed
  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // Get current timestamp
  String timestamp = getTimestamp();

  // Send each sensor value as a separate event
  sendSensorEvent("temperature", t, timestamp, "ESP8266");
  sendSensorEvent("humidity", h, timestamp, "ESP8266");
  sendSensorEvent("gasLevel", gasValue, timestamp, "ESP8266");
  sendSensorEvent("waterLevel", cm, timestamp, "ESP8266");

  delay(10000); // Wait for 10 seconds before sending next data
}

// Function to get current timestamp
String getTimestamp() {
  time_t now = time(nullptr); // Get current time
  struct tm *timeinfo;
  timeinfo = localtime(&now); // Convert to local time
  char timestamp[20];
  sprintf(timestamp, "%04d-%02d-%02dT%02d:%02d:%02d",
          timeinfo->tm_year + 1900, timeinfo->tm_mon + 1, timeinfo->tm_mday,
          timeinfo->tm_hour, timeinfo->tm_min, timeinfo->tm_sec);
  return String(timestamp);
}

// Function to send sensor event to the server
void sendSensorEvent(const char* type, float value, const String& timestamp, const char* organizer) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(wifiClient, "http://localhost:3000/api/v1"); // Replace with your server's URL
    http.addHeader("Content-Type", "application/json");

    // Create JSON document
    StaticJsonDocument<200> jsonDoc;
    jsonDoc["type"] = type;
    jsonDoc["value"] = value;
    jsonDoc["timestamp"] = timestamp;
    jsonDoc["organizer"] = organizer;

    // Serialize JSON document to string
    String jsonString;
    serializeJson(jsonDoc, jsonString);

    // Send POST request with JSON data
    int httpResponseCode = http.POST(jsonString);

    // Print response from server
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(httpResponseCode);
      Serial.println(response);
    } else {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  }
}

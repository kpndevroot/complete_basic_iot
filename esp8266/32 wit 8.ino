#include <WiFi.h>
#include <WebServer.h>
#include <HTTPClient.h>

const char* ssid = "Kalaivani";
const char* password = "9495115053";
// const char *ssid = "MALWARE";
// const char *password = "1kpndev@wifi21";
const char* ipify_url = "https://api.ipify.org";
const char* api_endpoint = "http://192.168.225.89:3000/myip";
WebServer server(8080);

const int relayPins[] = {19, 21, 22, 23, 14, 27, 33, 32}; // Replace these with the appropriate GPIO pins on your ESP32
// const int numRelays = sizeof(relayPins) / sizeof(relayPins[0]);
const int numRelays=8;
void setup() {
  Serial.begin(9600);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(250);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  sendLocalIPToAPI();
  for (int i = 0; i < numRelays; i++) {
    // Serial.println(i);
    pinMode(relayPins[i], OUTPUT);
    // digitalWrite(relayPins[i], HIGH);
  }

  server.on("/", HTTP_GET, []() {
    // String status = "Relay Status:\n";
    // for (int i = 0; i < numRelays; i++) {
    //   status += "Relay " + String(i + 1) + ": " + (digitalRead(relayPins[i]) ? "ON" : "OFF") + "\n";
    // }
    // server.send(200, "text/plain", status);
   

  });
   server.on("/myip", HTTP_GET, []() {
    String localIPString = WiFi.localIP().toString();
    server.send(200, "text/plain", localIPString);
  });

  for (int i = 0; i < numRelays; i++) {
    int relayIndex = i;
    server.on("/relay" + String(i + 1) + "/on", HTTP_GET, [relayIndex]() {
      digitalWrite(relayPins[relayIndex], HIGH);
      server.send(200, "text/plain", "Relay " + String(relayIndex + 1) + " turned on");
    });

    server.on("/relay" + String(i + 1) + "/off", HTTP_GET, [relayIndex]() {
      digitalWrite(relayPins[relayIndex], LOW);
      server.send(200, "text/plain", "Relay " + String(relayIndex + 1) + " turned off");
    });
  }

  server.begin();
}
void getPublicIP() {
  HTTPClient http;

  Serial.print("Getting public IP address...");

  // Make HTTP request
  http.begin(ipify_url);
  int httpCode = http.GET();

  // Check for successful response
  if (httpCode == HTTP_CODE_OK) {
    String payload = http.getString();
    Serial.print("Public IP Address: ");
    Serial.println(payload);
  } else {
    Serial.print("Failed to get IP address. Error code: ");
    Serial.println(httpCode);
  }

  http.end();
}


void sendLocalIPToAPI() {
  HTTPClient http;

  Serial.print("Sending local IP address to API endpoint...");

  // Construct the URL with the local IP address as a query parameter
  // String url = api_endpoint + "?local_ip=" + WiFi.localIP().toString();
String url = String(api_endpoint) + "?local_ip=" + WiFi.localIP().toString();

  http.begin(url);

  int httpResponseCode = http.GET();

  if (httpResponseCode > 0) {
    Serial.print("Local IP address sent to API endpoint, response code: ");
    Serial.println(httpResponseCode);
  } else {
    Serial.print("Error sending local IP address to API endpoint, response code: ");
    Serial.println(httpResponseCode);
  }

  http.end();
}

void loop() {
  server.handleClient();
}

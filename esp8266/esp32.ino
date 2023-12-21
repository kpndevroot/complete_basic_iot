#include <WiFi.h>
#include <WebServer.h>

const char *ssid = "piston";
const char *password = "12345432";

WebServer server(80);

const int relayPins[] = {19, 21, 22, 23}; // Replace these with the appropriate GPIO pins on your ESP32
const int numRelays = sizeof(relayPins) / sizeof(relayPins[0]);

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(250);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  for (int i = 0; i < numRelays; i++) {
    pinMode(relayPins[i], OUTPUT);
    digitalWrite(relayPins[i], LOW);
  }

  server.on("/", HTTP_GET, []() {
    // String status = "Relay Status:\n";
    // for (int i = 0; i < numRelays; i++) {
    //   status += "Relay " + String(i + 1) + ": " + (digitalRead(relayPins[i]) ? "ON" : "OFF") + "\n";
    // }
    // server.send(200, "text/plain", status);
    server.send(200, "text/plain", WiFi.localIP().toString());

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

void loop() {
  server.handleClient();
}

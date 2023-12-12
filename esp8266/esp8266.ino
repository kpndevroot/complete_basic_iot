#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

const char *ssid = "";
const char *password = "";

ESP8266WebServer server(80);

const int ledPin = D0;

void setup() {
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);

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

  server.on("/", HTTP_GET, []() {
    server.send(200, "text/plain", WiFi.localIP().toString());
  });

  server.on("/on", HTTP_GET, []() {
    digitalWrite(ledPin, HIGH);
    server.send(200, "text/plain", "LED turned on");
  });

  server.on("/off", HTTP_GET, []() {
    digitalWrite(ledPin, LOW);
    server.send(200, "text/plain", "LED turned off");
  });

  server.begin();
}

void loop() {
  server.handleClient();
}

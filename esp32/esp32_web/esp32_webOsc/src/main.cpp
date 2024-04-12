#include <Arduino.h>
#include <WiFi.h>
#include <WebSocketsClient.h>
#include <cmath>

const char *ssid = "FIBERTEL 677 2.4GHz";
const char *password = "0042307582";
const char *webSocketServer = "192.168.0.179";
const uint16_t webSocketPort = 3002;

WebSocketsClient webSocket;

// Define el tamaño del buffer de tipo float32
const size_t bufferSize = 50000;
float buffer[bufferSize];

void webSocketEvent(WStype_t type, uint8_t *payload, size_t length);

void setup()
{
  Serial.begin(115200);
  // Conecta con WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Conectando a WiFi...");
  }
  Serial.println("Conectado a WiFi");
  Serial.print("Dirección[bufferSize]; IP: ");
  Serial.println(WiFi.localIP());

  // Conecta con el servidor WebSocket
  webSocket.begin(webSocketServer, webSocketPort, "/");
  // webSocket.onEvent(webSocketEvent);
    const float frequency = 500.0f;  // Hz
    const float amplitude = 5.0f;

    for (size_t i = 0; i < bufferSize; ++i) {
        float timeInSeconds = static_cast<float>(i) / 200000.0f;  // Assuming a sample rate of 200000 Hz
        float value = amplitude * std::sin(2 * M_PI * frequency * timeInSeconds);
        buffer[i] = value;
    }

  // Inicializa el buffer con valores
  
}

void loop()
{
  webSocket.loop();

  // Envía el buffer a través del WebSocket cada 5 segundos
  static unsigned long lastMillis = 0;

  webSocket.sendBIN((uint8_t *)buffer, sizeof(buffer));
  lastMillis = millis();
}

void webSocketEvent(WStype_t type, uint8_t *payload, size_t length)
{
  switch (type)
  {
  case WStype_DISCONNECTED:
    Serial.println("WebSocket desconectado");
    break;
  case WStype_CONNECTED:
    Serial.println("WebSocket conectado");
    break;
  case WStype_TEXT:
    Serial.print("Mensaje recibido: ");
    Serial.println((char *)payload);
    break;
  case WStype_BIN:
    Serial.println("Datos binarios recibidos");
    // Maneja los datos binarios recibidos si es necesario
    break;
  case WStype_PING:
  case WStype_PONG:
  case WStype_ERROR:
    // Maneja otros eventos de WebSocket si es necesario
    break;
  }
}

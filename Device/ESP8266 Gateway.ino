#include <SPI.h>
#include <LoRa.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

#define ss 15
#define rst 16
#define dio0 2

const char* ssid = "WiskaTimmy";
const char* password = "asukabeh";
const char* serverName = "http://smartwastemanagement-api.herokuapp.com/trashdata/";
 
byte MasterNode = 0xFF;
byte Node1 = 0xBB;
byte Node2 = 0xCC;

String SenderNode = "";
String outgoing;
String incoming;
String weightsval;
String levelval;
String latval;
String lonval;
String fullval;
String idval;
String json;

byte msgCount = 0;

// Tracks the time since last event fired
unsigned long previousMillis=0;
unsigned long int previoussecs = 0;
unsigned long int currentsecs = 0;
unsigned long currentMillis = 0;
int interval= 5 ; // updated every 5 second
int Secs = 0;


void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
  Serial.println("LoRa Receiver master");
  LoRa.setPins(ss, rst, dio0);
  if (!LoRa.begin(433E6)) {          // initialize ratio at 915 MHz
    Serial.println("LoRa init failed. Check your connections.");
    while (true);
  }
  Serial.println("LoRa init succeeded.");
}

void loop() {
  currentMillis = millis();
  currentsecs = currentMillis / 1000; 
  if ((unsigned long)(currentsecs - previoussecs) >= interval) {
    //Serial.println("checking");
    Secs = Secs + 1;
    //Serial.println(Secs);
    if ( Secs >= 11 ){
      Secs = 0; 
    }
    if ( (Secs >= 1) && (Secs <= 5) ){
    String message = "34"; 
    sendMessage(message,MasterNode, Node1);
    }
    if ( (Secs >= 6 ) && (Secs <= 10)){
      String message = "34"; 
    sendMessage(message,MasterNode, Node1);
    //   String message = "55"; 
    //   sendMessage(message,MasterNode, Node2);
    }
    previoussecs = currentsecs;
  }
  onReceive(LoRa.parsePacket());
}


void sendMessage(String outgoing, byte MasterNode, byte otherNode) {
  LoRa.beginPacket();                   // start packet
  LoRa.write(otherNode);                // add destination address
  LoRa.write(MasterNode);               // add sender address
  LoRa.write(msgCount);                 // add message ID
  LoRa.write(outgoing.length());        // add payload length
  LoRa.print(outgoing);                 // add payload
  LoRa.endPacket();                     // finish packet and send it
  msgCount++;                           // increment message ID
}

void onReceive(int packetSize) {
  //Serial.println("LoRa receive.");
  if (packetSize == 0){
    return;          // if there's no packet, return
  }
  // read packet header bytes:
  int recipient = LoRa.read();          // recipient address
  byte sender = LoRa.read();            // sender address
  if( sender == 0XBB )
    SenderNode = "Node1:";
  if( sender == 0XCC )
    SenderNode = "Node2:";
  byte incomingMsgId = LoRa.read();     // incoming msg ID
  byte incomingLength = LoRa.read();    // incoming msg length

  incoming = "";

  while (LoRa.available()) {
    incoming += (char)LoRa.read();
  }

  if (incomingLength != incoming.length()) {   // check length for error
    Serial.println("error: message length does not match length");
    ;
    return;                             // skip rest of function
  }

  // if the recipient isn't this device or broadcast,
  if (recipient != Node1 && recipient != MasterNode) {
   Serial.println("This message is not for me.");
    ;
    return;                             // skip rest of function
  }
  Serial.println("check success");
  
  weightsval = getValue(incoming, ',', 0); // weight
  levelval = getValue(incoming, ',', 1); // level
  latval = getValue(incoming, ',', 2); // lat
  lonval = getValue(incoming, ',', 3); // lon
  fullval = getValue(incoming, ',', 4); // full
  idval = getValue(incoming, ',', 5); // id

 if( sender == 0xBB ){ 
  Serial.println(incoming + " From node 1");
  Serial.println("weight:" + weightsval);
  Serial.println("level:" + levelval);
  Serial.println("lat:" + latval);
  Serial.println("lon:" + lonval);
  Serial.println("isfull:" + fullval);
  Serial.println("id:" + idval);
 }

  if( sender == 0xCC ){ 
  Serial.println(incoming + " From node 2");
  Serial.println("weight:" + weightsval);
  Serial.println("level:" + levelval);
  Serial.println("lat:" + latval);
  Serial.println("lon:" + lonval);
  Serial.println("isfull:" + fullval);
  Serial.println("id:" + idval);
 }
 sendtoapi();
 incoming = "";
}

String getValue(String data, char separator, int index){
    int found = 0;
    int strIndex[] = { 0, -1 };
    int maxIndex = data.length() - 1;
 
    for (int i = 0; i <= maxIndex && found <= index; i++) {
        if (data.charAt(i) == separator || i == maxIndex) {
            found++;
            strIndex[0] = strIndex[1] + 1;
            strIndex[1] = (i == maxIndex) ? i+1 : i;
        }
    }
    return found > index ? data.substring(strIndex[0], strIndex[1]) : "";
}

void sendtoapi(){
  if(WiFi.status()== WL_CONNECTED){
    WiFiClient client;
    HTTPClient http;
    String path = serverName+idval;
    Serial.println(path);
    http.setTimeout(15000);
    http.begin(client, path);
    http.addHeader("Content-Type", "application/json");
    if( fullval.toInt() == 1){
      json = "{\"tempat_sampah_current\": {\"tempat_sampah_gpslocation\": {\"lon\": " + lonval + ",\"lat\": " + latval + "},\"tempat_sampah_currentcapacity\": " + weightsval + ",\"tempat_sampah_currentlevel\": " + levelval + "},\"tempat_sampah_isfull\": true}";
    }else{
      json = "{\"tempat_sampah_current\": {\"tempat_sampah_gpslocation\": {\"lon\": " + lonval + ",\"lat\": " + latval + "},\"tempat_sampah_currentcapacity\": " + weightsval + ",\"tempat_sampah_currentlevel\": " + levelval + "},\"tempat_sampah_isfull\": false}";
    }
    Serial.println(json);
    int httpResponseCode = http.PUT(json);
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    http.end();
  } else {
      Serial.println("WiFi Disconnected");
  }
}

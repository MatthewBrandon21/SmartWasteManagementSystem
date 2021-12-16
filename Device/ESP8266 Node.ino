#include <SPI.h>
#include <LoRa.h>
#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <Servo.h>

#define ss 15
#define rst 16
#define dio0 2

TinyGPSPlus gps;
SoftwareSerial ssgps(D4, D1);
Servo servo;

int weightvalue;
int levelvalue;
int firstVal;
int full = 0;
String outgoing;
String lat_str = "-7.085588";
String lon_str = "110.417997";
String myString;
String nodemessage = "";
String idnode = "amQ";
String weight;
String level;
char rdata;
byte msgCount = 0;
byte MasterNode = 0xFF;
byte Node1 = 0xBB;
float latitude , longitude;

void setup() {
  Serial.begin(115200);
  ssgps.begin(9600);
  while (!Serial);
  Serial.println("LoRa Duplex");
  LoRa.setPins(ss, rst, dio0);
  if (!LoRa.begin(433E6)) {             // initialize ratio at 915 MHz
    Serial.println("LoRa init failed. Check your connections.");
    while (true);
  }
  Serial.println("LoRa init succeeded.");
  servo.attach(0); //D4
}

void loop() {
  if (Serial.available() > 0 ) {
    rdata = Serial.read(); 
    myString = myString+ rdata; 
    if( rdata == '\n'){
      Serial.println(myString);
      weight = getValue(myString, ',', 0);
      weightvalue = weight.toInt(); 
      Serial.println(weight + "," + weightvalue);
      level = getValue(myString, ',', 1);
      levelvalue = level.toInt(); 
      Serial.println(level + "," + levelvalue);
      myString = "";
    }
  }
  while (ssgps.available() > 0){
      if (gps.encode(ssgps.read())){
       if (gps.location.isValid()){
         latitude = gps.location.lat();
         lat_str = String(latitude , 6);
         Serial.println(lat_str);
         longitude = gps.location.lng();
         lon_str = String(longitude , 6);
         Serial.println(lon_str);
       }
    }
  }
  if (weightvalue >= 1 || levelvalue <=15 && levelvalue != 0){
    full = 1;
    servo.write(0);
  } else {
    full = 0;
    servo.write(0);
  }
  onReceive(LoRa.parsePacket(), weightvalue, levelvalue, full);
  //nodemessage = String(weightvalue) +"," + String(levelvalue) + "," + lat_str + "," + lon_str + "," + full + "," + idnode; 
  //Serial.println(nodemessage);
}

void sendMessage(String outgoing, byte MasterNode, byte otherNode) {
  LoRa.beginPacket();                   // start packet
  LoRa.write(MasterNode);               // add destination address
  LoRa.write(Node1);                    // add sender address
  LoRa.write(msgCount);                 // add message ID
  String massagenodeini = String(weightvalue) +"," + String(levelvalue) + "," + lat_str + "," + lon_str + "," + full + "," + idnode;
  LoRa.write(outgoing.length());        // add payload length
  LoRa.print(outgoing);                 // add payload
  Serial.println(outgoing);
  LoRa.endPacket();                     // finish packet and send it
  msgCount++;                           // increment message ID
  massagenodeini = "";
}

void onReceive(int packetSize, int wv, int lv, int f) {
  if (packetSize == 0) return;
  int recipient = LoRa.read();          // recipient address
  byte sender = LoRa.read();            // sender address
  byte incomingMsgId = LoRa.read();     // incoming msg ID
  byte incomingLength = LoRa.read();    // incoming msg length
  String incoming = "";
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
    Serial.println(incoming);
    int Val = incoming.toInt();
    if(Val == 34){ 
      nodemessage = "";
      nodemessage = nodemessage + String(wv) +"," + String(lv) + "," + lat_str + "," + lon_str + "," + f + "," + idnode; 
      sendMessage(nodemessage,MasterNode,Node1);
      Serial.println("massage sent");
      nodemessage = "";
      delay(100);
    }
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

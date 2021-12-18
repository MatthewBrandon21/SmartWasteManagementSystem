#include <SoftwareSerial.h>
#include "HX711.h"
#include <stdlib.h>

#define DOUT 3
#define CLK 2
#define echoPin 6
#define trigPin 5

SoftwareSerial nodemcu(7, 8);
HX711 scale(DOUT, CLK);

String myString;
String cmessage;
char buff[10];
float weight;
float calibration_factor = -17034.36;
int distance;
long duration;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Serial.begin(115200);
  nodemcu.begin(115200);
  scale.set_scale();
  scale.tare();
  long zero_factor = scale.read_average();
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;
  scale.set_scale(calibration_factor);
  weight = scale.get_units(5);
  Serial.print("Readings: ");
  Serial.print(String(distance) + "cm & ");
  Serial.println(myString + "kg");
  myString = dtostrf(weight, 1, 0, buff);
  myString.replace("-","");
  cmessage = cmessage + myString + "," + distance + ","; 
  nodemcu.println(cmessage);
  Serial.println(cmessage); 
  cmessage = "";
  Serial.println();
  delay(3000);
}

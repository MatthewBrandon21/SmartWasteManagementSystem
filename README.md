<h1 align="center">
  Smart Waste Management System (SWMS)
</h1>
<p align="center">
  Smart city waste management system for our Mobile Pervasive Computing course final project.
</p>

Preview of this system:
<p align="Center">
  <img width="800" src="Images/Preview.jpg" />
</p>

General Architecture:
<p align="Center">
  <img width="800" src="Images/General Architecture.jpg" />
</p>

#

## How to make node device

Hardware Architecture:
<p align="Center">
  <img width="800" src="Images/Hardware Architecture.jpg" />
</p>

### List of component
- Microcontroller ESP8266
- Microcontroller Arduino Uno
- Lora Module SX1278
- GPS Module Neo 6M
- Weight Sensor HX711+ 10kg Load cell
- Ultrasonic Sensor HC SR 04
- Servo SG40
- Battery 18650
- TP4056A

### List of component for gateway
- Microcontroller ESP8266
- Lora Module SX1278

Total budget (December 2021) = Rp. 356.200 (~ US $24,76)

### Component pin connection
1. Servo
Orange : D3 (ESP8266)
Brown : GND (ESP8266)
Red : 3V3 (ESP8266)
2. Ultrasonic
VCC : 5V (Arduino Uno)
Trig : Digital 5 (Arduino Uno)
Echo : Digital 6 (Arduino Uno)
GND : GND (Arduino Uno)
3. GPS
GND : GND (ESP8266)
TX : D4 (ESP8266)
RX : D1 (ESP8266)
VCC : 3v3 (ESP8266)
4. HX711
VCC : 5V (Arduino Uno)
SCK : Digital 2 (Arduino Uno)
Data : Digital 3 (Arduino Uno)
GND : GND (Arduino Uno)
5. LoRa Wan
GND : GND (ESP8266)
VCC : 3.3V (ESP8266)
NSS : D8 (ESP8266)
MOSI : D7 (ESP8266)
MISO : D6 (ESP8266)
CK : D5 (ESP8266)
RST : D0 (ESP8266)
DIO0 : D2 (ESP8266)
6. Serial Communication Arduino Uno and ESP8266
Digital 7 (Arduino Uno): TX (ESP8266)
Digital 8 (Arduino Uno): RX (ESP8266)



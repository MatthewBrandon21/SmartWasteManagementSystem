# Smart Waste Management System Arduino Code

We're using ESP8266
For some other controllers including controllers which are not ESP family, may need some more configuration.

#

## libraries
1. SPI.h
2. Lora.h
3. ESP8266WiFi.h
4. ESP8266HTTPClient.h
5. WiFiClient.h
6. TinyGPS++.h
7. SofwareSerial.h
8. Servo.h
9. HX711.h
10. stdlib.h

#

## How to use this project ?
If you want reverse engineering this project app:
- Install and open arduino IDE
- Install esp38266 board family, using board manager
- Clone and open "Arduino Uno.ino", "ESP8266 Gateway.ino", and "ESP8266 Node.ino"
- Configure URL of API Server on "ESP8266 Gateway.ino"
- Flash 3 ino file to seperate controller (Arduino Uno.ino --> arduino uno, ESP8266 Gateway.ino --> esp8266 gateway, etc)
- Done

#

## How this work?
In this project, we use 2 microcontrollers, ESP8266 and Arduino Uno. The reason for using 2 microcontrollers simultaneously is because to supply power of weight sensor the HX711 module requires a larger current than the ESP8266 power regulator can provide. Therefore, if it is forced to run on esp8266, a bootloop will occur or it will restart continuously when the system boots. Arduino Uno's power regulator is larger than the ESP8266, therefore it can run the HX711 weight sensor module along with the ultrasonic sensor properly. But because we have implemented esp8266 in our prototype, we made it so that esp8266 and arduino uno can communicate to send sensor data. But if you want to save space, budget and efficiency, you can only use Arduino Uno.


For communication between the ESP8266 and Arduino Uno, use serial communication with a baud rate of 9600. Serial communication will happen every 3 seconds between Arduino Uno and Esp8266 to update esp8266 sensor data. And the lora frequency used is 915 MHz. To update data to API server will be done every 5 seconds by request by gateway. Then the gateway will request data one by one from the node so that data collisions do not occur (lora packet collosion -> for more details I have simulated packet collisions in LoRa communication which can be seen on).


For lora module with esp8266 using SPI communication protocol between the two. So the plot of Arduino Uno will send serial communication for weight sensor and Ultrasonic with plain text. Then it will be parsed by esp8266 in the trash, plus GPS data and the logic of whether the trash can is full or not by esp8266. And part of the value will be sent via Lora Payload to the esp8266 gateway. the gateway will parse the data sent by the node, and finally it will be generated as JSON to be sent HTTP PUT to the web API by the gateway.

<p align="Center">
  <img width="800" src="Images/code 1.jpg" />
</p>

So in the picture above, you can see the change in data retrieval requests and data updates to the API by the gateway. So in this example, seconds 1-5 will retrieve data from node 1 and seconds 6-10 will retrieve data from node 2.

<i>if need help, feel free to contact us! MatthewBrandon21 / rellpa.</i>
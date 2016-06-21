//const five = require("johnny-five");
const fs = require("fs");
const mqtt = require('mqtt');
// store serial number on startup
const serialNum = fs.readFileSync('/factory/serial_number').toString();
// change **** with the mqtt address given by mosquitto when setup on edison
client = new Paho.MQTT.Client('mqtt://test.mosquitto.org', 1883, "tester");
// client = new Paho.MQTT.Client(location.localhost, Number(location.1883), "WebApp");

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

//start connection
client.connect({onSuccess:onConnect});

function onConnect(){
  console.log('onConnect');
  // recieves a connection from the webApp
  client.subscribe('WebApp/confirm')
  //accepts a connection request from the webApp
  client.subscribe('WebApp/connection_request')

  // Take in edison serial and have it published
  ADASerial = new Paho.MQTT.Message(serialNum);
  ADASerial.destinationName = 'ADA/serial_id'
  client.send(ADASerial);
}
  // sends out a ping that device is on and present
  // client.publish(
  //   'ADA/present',
  //   'online'
  // )
  // // sends out edison serial number as a string to be compared on webApp
  // client.publish(
  //   'ADA/serial_id',
  //   serialNum
  // )
  // // sends out infomation related to device connection and if it is occupied, or free
  // client.publish('ADA/connection')
  // // sends out information regarding the device status (am I in webMode?)
  // client.publish('ADA/device_status')

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
}

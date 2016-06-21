const mqtt = require('mqtt');
client = mqtt.connect('mqtt://test.mosquitto.org');
// Stores Edisons serial number into a usable format
const fs = require('fs');
const serialNum = fs.readFileSync('/factory/serial_number').toString();

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// when a connection is made, publish the serial number of the edison
client.on('connect', () => {
  client.publish('ADA/serial_id', serialNum);
})

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

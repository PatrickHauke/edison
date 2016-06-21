const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://test.mosquitto.org');

console.log('hello')

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.on('connect', () =>{
        var echo = client.subscribe('ADA/serial_id');
        console.log(echo);
})

console.log('goood bye');

function onConnectionLost(responseObject){
        if (responseObject.errorCode != 0){
                console.log('onConnectionLost:',responseObject.errorMessage);
  }
}
function onMessageArrived(message) {
        console.log("onMessageArrived:"+message.payloadString);
}

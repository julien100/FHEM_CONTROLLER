// controller.js
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');
const baseUrl = "localhost:8083";


client.on('connect', () => {
  client.subscribe('fhem');
  console.log("Subscibed to fhem");
});

client.on('message', (topic, message) => {
  if(topic === 'fhem') {
    var stringMessage = message.toString();
    var jsonMessage = JSON.parse(stringMessage);
    updateState(jsonMessage);
    console.log('fhem message');
  }
});

function updateState(jsonMessage) {
  var device = jsonMessage.device;
  var state = jsonMessage.state;
  var theUrl = baseUrl + "/fhem?cmd." + device + "=set " + device + " " + state;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, true);
  xmlHttp.send();
}

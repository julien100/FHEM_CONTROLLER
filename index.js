// controller.js
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');
const baseUrl = "http://localhost:8083";
var http = require('http');
const querystring = require('querystring');



client.on('connect', () => {
  client.subscribe('fhem');
  console.log("Subscibed to fhem");
});

client.on('message', (topic, message) => {
  if(topic === 'fhem') {
    var stringMessage = message.toString();
    var jsonMessage = JSON.parse(stringMessage);
    if (jsonMessage.device === 'powernode') {
      updateState({device: "KU.STECKDOSE_1", state: jsonMessage.state});
    } else if (jsonMessage.device === 'house') {
      if (jsonMessage.state === 'good morning') {
        updateState({device: "KU.STECKDOSE_1", state: "on"});
      }
    }
  }
});

function updateState(jsonMessage) {
  var device = jsonMessage.device;
  var state = jsonMessage.state;
  console.log("Turning " + device + " " + state);
  var url = baseUrl + "/fhem?cmd." + device + "=set%20" + device + "%20" + state;
  http.get(url , function(response) {
    });
}

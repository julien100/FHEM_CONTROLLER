// controller.js
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');
const baseUrl = "http://localhost:8083";
var http = require('http');
const querystring = require('querystring');
//require('./database');
//var Device = require('./models/device');

client.on('connect', () => {
  client.subscribe('fhem');
  console.log("Subscibed to fhem");
});

client.on('message', (topic, message) => {
  if(topic === 'fhem') {
    handleMessage(message);
  }
});

function handleMessage(message) {
  var stringMessage = message.toString();
  var jsonMessage = JSON.parse(stringMessage);

//   Device.findOne({'alias_name': jsonMessage.device}, function(err, device) {
//   if (err) {
//   }
//   console.log(device);
// });

  if (jsonMessage.device === 'powernode') {
    updateState({device: "KU.STECKDOSE_1", state: jsonMessage.state});
  } else if (jsonMessage.device === 'house') {
    if (jsonMessage.state === 'good morning') {
      console.log("Set house state to " + jsonMessage.state);
      updateState({device: "KU.STECKDOSE_1", state: "on"});
    }
  }
}

function updateState(jsonMessage) {
  var device = jsonMessage.device;
  var state = jsonMessage.state;
  console.log("Turning " + device + " " + state);
  var url = baseUrl + "/fhem?cmd." + device + "=set%20" + device + "%20" + state;
  http.get(url , function(response) {
    });
}

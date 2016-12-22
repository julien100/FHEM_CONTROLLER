// controller.js
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');
const baseUrl = "localhost:8083";
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
    updateState(jsonMessage);
    console.log('fhem message');
  }
});

function updateState(jsonMessage) {
  var device = jsonMessage.device;
  var state = jsonMessage.state;
  var path = querystring.stringify("/fhem?cmd." + device + "=set " + device + " " + state);
  console.log("Path:" + path);
  http.get({
        host: baseUrl,
        path: path
    }, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            var parsed = JSON.parse(body);
            console.log("HTTP-SEND done!");
        });
    });
}

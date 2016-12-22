// controller.js
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost')


client.on('connect', () => {
  client.subscribe('fhem');
});

client.on('message', (topic, message) => {
  if(topic === 'fhem') {
    console.log('fhem message');
  }
});

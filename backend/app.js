const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http'); // Import the HTTP module
const WebSocket = require('ws'); // Import WebSocket library
const CircularBuffer = require('circular-buffer')
const OscConfigRouter = require('./controllers/oscConfig');
const { OscFunctionsRouter, savedFunctions } = require('./controllers/oscFunctions');

const middleware = require('./utils/middleware');

app.use(cors());
app.use(express.json());
app.use('/osc_config', OscConfigRouter)
app.use('/osc_functions', OscFunctionsRouter)

const server = http.createServer(app); // Create HTTP server
const wss = new WebSocket.Server({ server }); // Create WebSocket server



const sampleFrec = 10000



const buffer1 = new CircularBuffer(sampleFrec * 10)
const buffer2 = new CircularBuffer(sampleFrec * 10)

for (let i = 0; i < sampleFrec * 10; i++) {
  buffer1.enq(1);
  buffer2.enq(1);
}


let webSocketBuffer = new Float32Array(buffer1.toarray().concat(buffer2.toarray()))
console.log(webSocketBuffer.length)
let randomVal = 0

wss.addListener('connection', (ws) => {
 
  ws.on('message', (message) => {
    console.log(message.buffer)
    
   webSocketBuffer.set(new Float32Array(message.buffer))

    console.log('Received Float32 value:', webSocketBuffer);
  });


})

wss.on('connection', (ws) => {
  console.log('Client connected');
  setInterval(() => {
    /*randomVal = (Math.random().toFixed(3) * 3 - 5) + savedFunctions.offset
    buffer1.enq(randomVal);
    buffer1.enq(randomVal);
    buffer1.enq(randomVal);
    buffer1.enq(randomVal);
    randomVal = (Math.random().toFixed(3) * 3) + savedFunctions.offset
    buffer2.enq(randomVal);
    buffer2.enq(randomVal);
    buffer2.enq(randomVal);
    buffer2.enq(randomVal);
    webSocketBuffer.set(buffer1.toarray().concat(buffer2.toarray()))*/
    ws.send(webSocketBuffer);
  }, 1000)


  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

module.exports = { app, server }; // Export both app and server

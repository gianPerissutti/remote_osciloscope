const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http'); // Import the HTTP module
const WebSocket = require('ws'); // Import WebSocket library
const CircularBuffer = require('circular-buffer')
const OscConfigRouter = require('./controllers/oscConfig');


const middleware = require('./utils/middleware');

app.use(cors());
app.use(express.json());
app.use('/osc_config', OscConfigRouter)


const server = http.createServer(app); // Create HTTP server
const wss = new WebSocket.Server({ server }); // Create WebSocket server

const frequency = 2; // Frequency in Hz

const sampleFrec = 10000


const buffer1seg = new CircularBuffer(sampleFrec * 10)

for (let i = 0; i < sampleFrec * 10; i++) {
  buffer1seg.enq(1);
}

let webSocketBuffer = new Float32Array(buffer1seg.toarray())
let randomVal = 0
wss.on('connection', (ws) => {
  console.log('Client connected');
  setInterval(() => {
    randomVal = Math.random().toFixed(3) * 10 - 5
    buffer1seg.enq(randomVal);
    buffer1seg.enq(randomVal);
    buffer1seg.enq(randomVal);
    buffer1seg.enq(randomVal);
    webSocketBuffer.set(buffer1seg.toarray())
    ws.send(webSocketBuffer);

  }, 1000/60)


  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

module.exports = { app, server }; // Export both app and server

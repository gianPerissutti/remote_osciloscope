const { app, server } = require('./app'); // Import app and server from app.js
const config = require('./utils/config');
const logger = require('./utils/logger');

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

console.log(`WebSocket Server running on port ${config.WS_PORT}`)
const express = require('express');
const http = require('http');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'))

const config = require('./utils/config')
require('./utils/express')(app);
require('./utils/db')
const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`${config.APP_NAME} ${config.ENVIRONMENT} server is running on port ${config.PORT}`);
});
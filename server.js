const express = require('express');
const http = require('http');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
app.use(morgan('dev'))
app.use(helmet());

const config = require('./utils/config')
require('./utils/express')(app);
require('./utils/db')
const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`${config.APP_NAME} ::: ${config.NODE_ENV} server is running on port ${config.PORT}`);
});
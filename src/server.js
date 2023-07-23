const app = require('./apis/v1/app');
const http = require('http');
const chalk = require('chalk');
const { SERVER_PORT } = require('./config/configVar');
const connect = require('./db/mongoose');
const CONST = require('./config/consts');
//import connect from './db/sql';
const { NAMESPACE } = CONST;
const server = http.createServer(app);

server.listen(SERVER_PORT, () => {
    console.info(chalk.bgWhite.black.bold(`Connecting to Server on port ${SERVER_PORT}`));
    console.info(chalk.bgWhite.black.bold(`API templted by Jitul Teron`));
    connect();
});

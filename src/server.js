const app = require('./apis/v1/app');
const http = require('http');
const chalk = require('chalk');
const { SERVER_PORT } = require('./config/const/server');
const { client, createTable } = require('./db/cassandra');

const server = http.createServer(app);

server.listen(SERVER_PORT, async () => {
    await client.connect();
    await createTable();
    console.info(chalk.bgWhite.black.bold(`Connecting to Server on port ${SERVER_PORT}`));
    console.info(chalk.bgWhite.black.bold(`API templted by Jitul Teron`));
});

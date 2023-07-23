const mongoose = require('mongoose');
const { config } = require('../config/mongo');
const { NAMESPACE } = require('../config/const/server');
const logger = require('../config/logger');

function connection() {
    return mongoose
        .connect(config.mongo.url, config.mongo.options)
        .then((result) => {
            logger.info(NAMESPACE, 'Mongo Connected');
        })
        .catch((error) => {
            logger.error(NAMESPACE, error.message, error);
        });
}

module.exports = connection;

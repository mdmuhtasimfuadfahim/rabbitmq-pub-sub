const httpStatus = require('http-status');
const RegisteredTopic = require('../config/RegisteredTopic');
const RabbitMQError = require('../config/RabbitMQError');
const RabbitMQLogger = require('../config/RabbitMQLogger');

const validateData = async (topic, data) => {
    RabbitMQLogger.info(topic, data, `validating topic ${topic}`);
    switch (topic) {
        case RegisteredTopic.FAKE_DATA:
            if (!data.Name) {
                RabbitMQLogger.error(topic, data, 'Name is required');
                throw new RabbitMQError(httpStatus.BAD_REQUEST, 'Name is required');
            }
            if (!data.University) {
                RabbitMQLogger.error(topic, data, 'University is required');
                throw new RabbitMQError(httpStatus.BAD_REQUEST, 'University is required');
            }
            if (!data.Email) {
                RabbitMQLogger.error(topic, data, 'Email is required');
                throw new RabbitMQError(httpStatus.BAD_REQUEST, 'Email is required');
            }
        break;
    default:
        throw new RabbitMQError(httpStatus.BAD_REQUEST, 'Topic is not supported');
  }
};
module.exports = validateData;

const RegisteredTopics = require('./config/RegisteredTopic');
const ValidateTopic = require('./validation/ValidateTopic');
const RabbitMQLogger = require('./config/RabbitMQLogger');
const ValidateData = require('./validation/ValidateData');
const amqp = require('amqplib');

const publishEvent = async (topic, data = {}) => {
    try {
        RabbitMQLogger.info(topic, data, `Producing topic ${topic}`);
        ValidateTopic(topic);
        ValidateData(topic, data);
    
        const amqpServer = process.env.AMQP_URL;
        var connection = await amqp.connect(amqpServer);
        var channel = await connection.createChannel();
        await channel.assertQueue(topic);
    
        await channel.sendToQueue(topic, Buffer.from(JSON.stringify(data)));
        await channel.close();
        await connection.close();
        RabbitMQLogger.info(topic, data, `Message has been broadcast`);
    } catch (error) {
        RabbitMQLogger.info(topic, data, error);
    }
}

module.exports = publishEvent;
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5002;

const SubscribeEvent = require('./messagebroker/SubscribeEvent');
const RegisteredTopics = require('./messagebroker/config/RegisteredTopic');
SubscribeEvent();

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})
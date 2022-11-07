require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;
const PublishEvent = require('./messagebroker/PublishEvent');
const RegisteredTopics = require('./messagebroker/config/RegisteredTopic');

app.post('/send', async (req, res) => {
    const fakeData = {
        Name: "Md. Muhtasim Fuad Fahim",
        University: "University of Liberal Arts Bangladesh",
        Email: "muhtasim.fuad.cse@ulab.edu.bd",
    };

    await PublishEvent(RegisteredTopics.FAKE_DATA, fakeData);
    return res.status(200).send("Done!");
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})
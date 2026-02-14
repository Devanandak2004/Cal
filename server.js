const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace with NEW token from BotFather
const TOKEN = "8567789241:AAHZDaO-Oc37bDmo-JSqgSEco712mTgPrgs";
const CHAT_ID = "5002643968";


// Test route
app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.post("/send", async (req, res) => {
    const data = req.body;

    const message = `
New Submission:
Name1: ${data.name1}
Name2: ${data.name2}
Result: ${data.result}
`;

    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    try {
        await axios.post(url, {
            chat_id: CHAT_ID,
            text: message
        });

        res.send("Message sent");
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).send("Error sending message");
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});

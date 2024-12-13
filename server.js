const express = require("express");
const axios = require("axios");
const path = require("path"); 
require("dotenv").config();
const app = express();
app.use('/public', express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 3000;
const OPENWEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

// Serve static files (HTML, CSS, JS) from the 'html' folder
app.use(express.static('html'));

// Weather API Endpoint
app.get("/weather", async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: "City query parameter is required." });
    }

    try {
        const response = await axios.get(OPENWEATHER_URL, {
            params: {
                q: city,
                appid: process.env.OPENWEATHER_API_KEY,
                units: "metric",
            },
        });

        const weatherData = response.data;
        res.json({
            city: weatherData.name,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            windSpeed: weatherData.wind.speed,
            humidity: weatherData.main.humidity,
        });
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).json({ error: error.response.data.message });
        }
        res.status(500).json({ error: "Something went wrong!" });
    }
});

// Handle the root URL request and return the HTML page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/html/index.html");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

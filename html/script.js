document.getElementById("weather-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission

    const city = document.getElementById("city").value;
    const resultDiv = document.getElementById("weather-result");

    // Clear previous results
    resultDiv.innerHTML = `<div class="loading">Loading...</div>`;

    try {
        // Make API call to your server
        const response = await fetch(`http://localhost:3000/weather?city=${city}`);
        const data = await response.json();

        if (response.ok) {
            // Display weather data
            resultDiv.innerHTML = `
                <h2>Weather in ${data.city}</h2>
                <p><strong>Temperature:</strong> ${data.temperature}°C</p>
                <p><strong>Description:</strong> ${data.description}</p>
                <p><strong>Wind Speed:</strong> ${data.windSpeed} m/s</p>
                <p><strong>Humidity:</strong> ${data.humidity}%</p>
            `;
        } else {
            // Display error message
            resultDiv.innerHTML = `<p class="error">Error: ${data.error}</p>`;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p class="error">Unable to fetch weather data. Please try again later.</p>`;
    }
});

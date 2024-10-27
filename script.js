const apiKey = "api-url"; 

document.getElementById("fetch-weather-btn").onclick = async function () {
    const country = document.getElementById("country-input").value.trim();
    const city = document.getElementById("city-input").value.trim();

    if (country && city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`);
            const data = await response.json();

            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert("City or country not found");
                clearWeatherResult();
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
            clearWeatherResult();
        }
    } else {
        alert("Please enter both country code and city name.");
    }
};

function displayWeather(data) {
    const weatherResult = document.getElementById("weather-result");
    weatherResult.innerHTML = `
        <h3>Weather in ${data.name}, ${data.sys.country}</h3>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
    weatherResult.style.display = 'block'; 
}

function clearWeatherResult() {
    const weatherResult = document.getElementById("weather-result");
    weatherResult.innerHTML = "";
    weatherResult.style.display = 'none'; 
}

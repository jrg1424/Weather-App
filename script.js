// Grab HTML elements so we can interact with them
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherDisplay = document.getElementById('weather-display');
const cityName = document.getElementById('city-name');
const temp = document.getElementById('temp');
const description = document.getElementById('description');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const clearBtn = document.getElementById('clear-btn');

// REPLACE THIS with your actual API key from OpenWeatherMap
const apiKey = "c111986ba7b4f57fa1f85aecc12d4560"; 

// Show or hide the 'x' clear button depending on whether text is typed
cityInput.addEventListener('input', () => {
    if (cityInput.value.trim() !== "") {
        clearBtn.classList.remove('hidden');
    } else {
        clearBtn.classList.add('hidden');
    }
});

// Clear the input and hide the weather card when 'x' is clicked
clearBtn.addEventListener('click', () => {
    cityInput.value = '';
    clearBtn.classList.add('hidden');
    weatherDisplay.classList.add('hidden');
    cityInput.focus();
});

// Listen for a click on the search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        getWeather(city);
    }
});

// Also allow pressing "Enter" in the input box
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city !== "") {
            getWeather(city);
        }
    }
});

// Function to fetch current weather data
async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        
        // Update current weather UI
        cityName.textContent = data.name;
        temp.textContent = `${Math.round(data.main.temp)}°F`;
        description.textContent = data.weather[0].description;
        feelsLike.textContent = `Feels like: ${Math.round(data.main.feels_like)}°F`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeed.textContent = `Wind: ${Math.round(data.wind.speed)} mph`;

        weatherDisplay.classList.remove('hidden');

    } catch (error) {
        alert("Could not find that city. Please check the spelling or try again!");
        console.error(error);
    }
}
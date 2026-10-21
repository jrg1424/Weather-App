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
const forecastContainer = document.getElementById('forecast-container');
const weatherIcon = document.getElementById('weather-icon'); // Added Weather Icon element

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

// Function to fetch current weather data AND 5-day forecast
async function getWeather(city) {
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    

    try {
        // Fetch both resources in parallel
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentUrl),
            fetch(forecastUrl)
        ]);
        
        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("City not found");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();
        
        // Update current weather UI
        cityName.textContent = currentData.name;
        temp.textContent = `${Math.round(currentData.main.temp)}°F`;
        description.textContent = currentData.weather[0].description;
        feelsLike.textContent = `Feels like: ${Math.round(currentData.main.feels_like)}°F`;
        humidity.textContent = `Humidity: ${currentData.main.humidity}%`;
        windSpeed.textContent = `Wind: ${Math.round(currentData.wind.speed)} mph`;

        // Update the main weather icon
        const iconCode = currentData.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.alt = currentData.weather[0].description;

        // Process and display the 5-day forecast
        displayForecast(forecastData);

        weatherDisplay.classList.remove('hidden');

    } catch (error) {
        alert("Could not find that city. Please check the spelling or try again!");
        console.error(error);
    }
}

// Helper function to build the forecast layout
function displayForecast(data) {
    forecastContainer.innerHTML = ''; // Clear previous forecast cards

    // Filter data to only grab the forecast entry closest to 12:00 PM (noon) each day
    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    dailyData.forEach(item => {
        // Convert timestamp (dt) into a readable Short Day Name (e.g., "Mon")
        const date = new Date(item.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

        //Weather Icon for each forecast card
        const forecastIconCode = item.weather[0].icon; 
    

        // Create HTML structure for each individual forecast card
        const card = document.createElement('div');
        card.classList.add('forecast-card');
        card.innerHTML = `
            <div class="day">${dayName}</div>
            <img class="forecast-icon" src="https://openweathermap.org/img/wn/${forecastIconCode}@2x.png" alt="${item.weather[0].main}">
            <div class="temp">${Math.round(item.main.temp)}°F</div>
            <div class="desc">${item.weather[0].main}</div>
        `;

        forecastContainer.appendChild(card);
    });
}

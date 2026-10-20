# Weather App

A lightweight weather dashboard built with HTML, CSS, and JavaScript. This project lets users search for a city and view the current weather conditions in a clean, simple interface.

## Overview

This app was created as a beginner-friendly project to practice working with APIs, handling user input, and dynamically updating the DOM with JavaScript. It uses the OpenWeatherMap API to fetch live weather data for a city entered by the user.

The app displays current weather information such as temperature, weather condition, feels-like temperature, humidity, and wind speed.

## Features

- Search for a city by name
- Click the Search button or press Enter to fetch weather data
- Clear button to reset the input and hide the weather card
- Display:
  - city name
  - current temperature
  - weather description
  - feels-like temperature
  - humidity
  - wind speed
- Responsive, card-style layout
- Error alert if the city cannot be found

## Tech Stack

- HTML
- CSS
- JavaScript
- OpenWeatherMap API

## Project Structure

- index.html — page structure and UI layout
- style.css — styling, color palette, layout, and button design
- script.js — API request logic, event listeners, and DOM updates
- README.md — project documentation

## How It Works

1. The user enters a city name.
2. The app sends a request to the OpenWeatherMap weather endpoint.
3. The API returns the current weather data for that city.
4. The JavaScript code updates the page with the returned values.
5. If the city is invalid, the app alerts the user and logs the error.

The app uses imperial units, so temperature is displayed in Fahrenheit and wind speed in miles per hour.

## Setup

1. Open the project folder in your browser.
2. Ensure the API key in script.js is valid.
3. Open index.html in a browser.
4. Type a city name and click Search.

## Notes

- This project is a front-end app only; there is no backend server.
- It is designed to teach basic API usage and dynamic UI updates.
- The app is intentionally simple and beginner-friendly.

## Future Improvements

- Add a 5-day forecast
- Add weather icons for different conditions
- Support Celsius/Fahrenheit switching
- Add geolocation so weather can be checked automatically
- Improve accessibility and validation
- Move the API key into a safer environment-based configuration for production use

import weatherCodes from "./weather-codes.js";
import config from "../../../data/config.js";

const weatherLocation = config.zipCode;

const weatherLocationName = document.querySelector('.weather-location-name');
const currentWeatherIcon = document.querySelector('.weather-icon');
const currentWeatherTemperature = document.querySelector('.weather-temperature');
const currentWeatherDescription = document.querySelector('.weather-description');
const weatherForecastList = document.querySelector('.weather-forecast-list');

function getDay(dateString)
{
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
}

async function getLocation(location)
{
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`);

    if (!response.ok)
    {
        throw new Error('Could not get location data');
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0)
    {
        throw new Error('Location not found');
    }

    const result = data.results[0];

    return {
        name: result.name || 'No name availiable',
        latitude: result.latitude,
        longitude: result.longitude
    };
}

async function getWeather(location)
{
    const { latitude, longitude, name } = await getLocation(location);

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min`);

    if (!response.ok)
    {
        throw new Error('Could not get weather data');
    }

    const data = await response.json();
    
    return {
        name,
        current: data.current,
        daily: data.daily
    };
}

export default function main()
{
    async function setWeather()
    {
        const weather = await getWeather(weatherLocation)
        
        const {temperature_2m, weather_code} = weather.current;
        const {weather_code: daily_weather_code, temperature_2m_max, temperature_2m_min, time} = weather.daily;
        const weatherCondition = weatherCodes[weather_code];
        const imgSrc = `./assets/icons/${weatherCondition.icon}`;

        if (!config.isCelsius)
        {
            currentWeatherTemperature.textContent = `${Math.round(temperature_2m * (9 / 5) + 32)}°F`;
        }
        else
        {
            currentWeatherTemperature.textContent = `${temperature_2m}°C`;
        }

        weatherLocationName.textContent = weather.name;
        currentWeatherDescription.textContent = weatherCondition.name;
        currentWeatherIcon.src = imgSrc;

        weatherForecastList.innerHTML = '';
        for (let i = 0; i < 7; i++)
        {
            let dayName = getDay(time[i]);

            if (i === 0)
            {
                dayName = 'Today';
            }

            let temperatureValue;

            if (!config.isCelsius)
            {
                temperatureValue = `${Math.round(((temperature_2m_max[i] + temperature_2m_min[i]) / 2) * (9 / 5) + 32)}°F`;
            }
            else
            {
                temperatureValue = `${Math.round((temperature_2m_max[i] + temperature_2m_min[i]) / 2)}°C`;
            }

            const weatherCondition = weatherCodes[daily_weather_code[i]];
            const imgSrc = `./assets/icons/${weatherCondition.icon}`;

            const listItem = document.createElement('li');
            const icon = document.createElement('img');
            const dayElem = document.createElement('span');
            const tempElem = document.createElement('span');

            icon.classList.add('weather-forecast-icon');
            icon.src = imgSrc;

            dayElem.classList.add('weather-forecast-day');
            dayElem.textContent = dayName;
            if (dayName === 'Today')
            {
                dayElem.style.fontWeight = 600;
                dayElem.style.color = '#ffffffd3';
            }

            tempElem.classList.add('weather-forecast-temperature');
            tempElem.textContent = temperatureValue;

            listItem.classList.add('weather-forecast-item');
            listItem.appendChild(icon);
            listItem.appendChild(dayElem);
            listItem.appendChild(tempElem);

            weatherForecastList.appendChild(listItem);
        }
    }

    return setWeather();
}


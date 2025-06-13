const weatherCodes = {
     0: {
          name: "Clear Sky",
     },
     1: {
          name: "Mainly Clear"
     },
     2: {
          name: "Partly Cloudy",
     },
     3: {
          name: "Overcast",
     },
     45: {
          name: "Fog",
     },
     48: {
          name: "Rime Fog",
     },
     51: {
          name: "Light Drizzle",
     },
     53: {
          name: "Moderate Drizzle",
     },
     55: {
          name: "Heavy Drizzle",
     },
     56: {
          name: "Light Freezing Drizzle",
     },
     57: {
          name: "Dense Freezing Drizzle",
     },
     61: {
          name: "Slight Rain",
     },
     63: {
          name: "Moderate Rain",
     },
     65: {
          name: "Heavy Rain",
     },
     66: {
          name: "Light Freezing Rain",
     },
     67: {
          name: "Heavy Freezing Rain",
     },
     71: {
          name: "Slight snowfall",
     },
     73: {
          name: "Moderate snowfall",
     },
     75: {
          name: "Heavy snowfall",
     },
     77: {
          name: "Snow Grains",
     },
     80: {
          name: "Slight Rain Showers",
     },
     81: {
          name: "Moderate Rain Showers",
     },
     82: {
          name: "Violent Rain Showers",
     },
     85: {
          name: "Light Snow Showers",
     },
     86: {
          name: "Heavy Snow Showers",
     },
     95: {
          name: "Thunderstorm",
     },
     96: {
          name: "Slight Hailstorm",
     },
     99: {
          name: "Heavy Hailstorm",
     }
};

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

export async function getWeather(location)
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

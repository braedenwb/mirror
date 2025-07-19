import { date } from '../utils/time/time-utils.js';
import { time } from '../utils/time/time-utils.js';
import main from '../utils/weather/weather-utils.js';
import config from '../../data/config.js';

const dateElement = document.querySelector('.date');
const clock = document.querySelector('.time');

date(dateElement);
time(clock);

main();
setInterval(main, 600000);

if (config.name === "")
{
    alert("Please fill out the configuration file at /mirror/data/config.js");
}
else
{
    const greeting = document.createElement('div');
}


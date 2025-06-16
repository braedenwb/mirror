import time from '../utils/time-utils.js';
import main from '../utils/weather/weather-utils.js';

const clock = document.querySelector('.time');

if (clock)
{
    time(clock);
}
else
{
    console.error('No clock');
}

main();
setInterval(main, 600000);

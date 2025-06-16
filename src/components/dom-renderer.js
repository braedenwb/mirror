import { date } from '../utils/time-utils.js';
import { time } from '../utils/time-utils.js';
import main from '../utils/weather/weather-utils.js';

const dateElement = document.querySelector('.date');
const clock = document.querySelector('.time');

date(dateElement);
time(clock);

main();
setInterval(main, 600000);

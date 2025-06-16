import config from '../../data/config.js';

export function time(element)
{
    function getTime()
    {
        const time = new Date();

        let minutes = time.getMinutes().toString().padStart(2, '0');
        let hours = time.getHours();

        if (config.militaryTime)
        {
            element.textContent = `${hours}:${minutes}`;
        }
        else
        {
            if (hours > 12)
            {
                hours -= 12;
                element.textContent = `${hours}:${minutes} PM`;
            }
            else
            {
                element.textContent = `${hours}:${minutes} AM`;
            }
        }
    }

    getTime();
    return setInterval(getTime, 1000);
}

export function date(element)
{
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    function getDate()
    {
        const date = new Date();
        
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        element.textContent = `${dayName}, ${month} ${day}, ${year}`;
    }

    getDate();
    
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    
    const timeUntilMidnight = midnight - now;

    setTimeout(() => {
        getDate();
        setInterval(getDate, 86400000);
    }, timeUntilMidnight);
}
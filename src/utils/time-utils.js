/*
    JS File for getting the current time and updating every second
*/

export default function time(element)
{
    function getTime()
    {
        const time = new Date();

        let minutes = time.getMinutes().toString().padStart(2, '0');
        let hours = time.getHours();

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

    getTime();
    return setInterval(getTime, 1000);
}
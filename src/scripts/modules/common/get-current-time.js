import global from '../global-variables';
export default function(differentDate = 0, differentStartDate = null){
        var time = {};
        var date = differentStartDate ? new Date(differentStartDate) : new Date();
        if(differentDate) date.setDate(date.getDate() + differentDate);
        time.day = date.getDate();
        time.month = date.getMonth() + 1;
        time.year = date.getFullYear();
        time.hour = date.getHours();
        time.minutes = date.getMinutes();
        time.weekDay = date.getDay(); //Sunday is 0, Monday is 1..
        time.literal = date.toUTCString();
        time.dayNameFull = date.toLocaleDateString(global.locale, { weekday: 'long' });
        time.dayNameShort = date.toLocaleDateString(global.locale, { weekday: 'short' });
        time.monthNameFull = date.toLocaleDateString(global.locale, { month: 'long' });
        time.monthNameShort = date.toLocaleDateString(global.locale, { month: 'short' });
        time.displayDate = `${time.dayNameShort}, ${time.monthNameShort}  ${time.day} ${time.year}`;
        time.displayDateLong = `${time.dayNameFull}, ${time.monthNameFull} ${time.year}`;
        time.displayTime = `${time.hour}:${(time.minutes < 10 ? '0' : '') + time.minutes}`;
        time.keyFromDate = `${time.day}/${time.month}/${time.year}`;
        time.date = new Date(`${time.month}/${time.day}/${time.year}`);//set date without time
        return time;
}

// export default class Time{
//         constructor(differentDate = 0, differentStartDate = null){
//                 this.date = 1;

//         }
// }
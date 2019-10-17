import global from '../global-variables';
export default function(differentDate = 0, differentStartDate = null){
        let time = {};
        const date = differentStartDate ? new Date(differentStartDate) : new Date();
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
        time.displayKeyFromDate = (()=>{
                switch(global.dateFormat){
                case 'dd/mm/yyyy':
                        return `${time.day}/${time.month}/${time.year}`;
                case 'mm/dd/yyyy':
                        return `${time.month}/${time.day}/${time.year}`;
                case 'yyyy/mm/dd':
                        return `${time.year}/${time.month}/${time.day}`;
                case 'yyyy/dd/mm':
                        return `${time.year}/${time.month}/${time.day}`;
                }
        })();
        time.keyFromDate = `${time.day}/${time.month}/${time.year}`;
        time.date = new Date(`${time.month}/${time.day}/${time.year}`);//set date without time
        return time;
}
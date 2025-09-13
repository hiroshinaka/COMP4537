export class Clock {
 static formatTime(d){
    const dt = (d instanceof Date) ? d : new Date(d);
    return dt.toLocaleTimeString(undefined, {hour12: false})
    }
}
exports.time = function (){
    const now = new Date();

    // Parts: Wed Sept 01 2023 12:52:14 GMT-0800 (Pacific Standard Time)
    const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // Use "Sept" explicitly (Date.toString() uses "Sep")
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    const wk = WEEKDAYS[now.getDay()];
    const mon = MONTHS[now.getMonth()];
    const dd = String(now.getDate()).padStart(2, '0');
    const yyyy = String(now.getFullYear());
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');

    // Timezone offset like GMT-0800
    const offsetMinutes = now.getTimezoneOffset(); // minutes to add to local time to get UTC (positive for zones behind UTC)
    const sign = offsetMinutes > 0 ? '-' : '+'; // behind UTC => '-'
    const offH = String(Math.floor(Math.abs(offsetMinutes) / 60)).padStart(2, '0');
    const offM = String(Math.abs(offsetMinutes) % 60).padStart(2, '0');

    // Long timezone name from system, e.g., "Pacific Standard Time" or "Pacific Daylight Time"
    let tzLong = 'GMT';
    const m = now.toString().match(/\(([^)]+)\)/);
    if (m && m[1]) tzLong = m[1];

    return `${wk} ${mon} ${dd} ${yyyy} ${hh}:${mm}:${ss} GMT${sign}${offH}${offM} (${tzLong})`;
}
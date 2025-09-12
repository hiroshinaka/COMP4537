class Clock {
    static pad(n){
        return String(n).padStart(2, '0');
    }
    static nowHMS(){
        const d = new Date();
        return `${Clock.pad(d.getHours())}:${Clock.pad(d.getMinutes())}:${Clock.pad(d.getSeconds())}`;
    }
}
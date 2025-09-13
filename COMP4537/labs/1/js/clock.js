export class Clock {
/*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Clock object
   * Static formatTime method to format date
   * @param {Date|number|string} d - The date or date-like object to format.
   * @returns {string} - The formatted time string in 24-hour format.
   */
/*******  2f5e65af-6316-4a85-834e-64759ff132f2  *******/
 static formatTime(d){
    const dt = (d instanceof Date) ? d : new Date(d);
    return dt.toLocaleTimeString(undefined, {hour12: false})
    }
}
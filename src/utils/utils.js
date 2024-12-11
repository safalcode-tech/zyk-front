/**
 * Format a given date into 'MM/DD/YYYY hh:mm AM/PM' format.
 * @param {Date | string} dateInput - The date to format (Date object or string).
 * @returns {string} - The formatted date and time.
 */
// export function formatDateWithAmPm(dateInput) {
//     // Convert input to a Date object if it's not already
//     const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

//     if (isNaN(date.getTime())) {
//         throw new Error('Invalid date provided');
//     }

//     const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//     const formattedDate = date.toLocaleDateString('en-US', options);

//     let hours = date.getHours();
//     const minutes = date.getMinutes();
//     const amPm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12 || 12; // Convert to 12-hour format

//     const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${amPm}`;

//     return `${formattedDate} ${formattedTime}`;
// }

export const formatDateWithAmPm = (date) => {
    if (!date) return 'N/A'; // Return a default value if date is null or undefined
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return 'Invalid Date'; // Handle invalid date format
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return parsedDate.toLocaleDateString() + ' ' + parsedDate.toLocaleTimeString([], options);
  };
  
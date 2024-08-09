/**
 * Convert ISO 8601 date string to a readable format "YYYY-MM-DD HH:mm:ss"
 * @param {string} isoString - The ISO 8601 date string
 * @returns {string} - Formatted date string
 */
/**
 * Convert ISO 8601 date string to a readable format "YYYY-MM-DD HH:mm:ss"
 * @param {string | undefined | null } isoString - The ISO 8601 date string
 * @returns {string} - Formatted date string
 */
export function formatDate(isoString: string | undefined | null): string {
    if (!isoString) return '';
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
}

type DateTimePartType = 'date' | 'time';

/**
 * Get either the date (YYYY-MM-DD) or time (HH:mm) from a formatted date string
 * @param {string} formattedDate - The formatted date string
 * @param {DateTimePartType} type - The type of output: 'date' or 'time'
 * @returns {string} - Formatted date or time string
 */
export function getDateTimePart(
    formattedDate: string,
    type: DateTimePartType,
): string {
    const [datePart, timePart] = formattedDate.split(' ');

    if (type === 'date') {
        return datePart;
    } else if (type === 'time') {
        return timePart.slice(0, 5); // Extract "HH:mm" from "HH:mm:ss"
    } else {
        throw new Error("Invalid type. Use 'date' or 'time'.");
    }
}

/**
 * Calculate the difference between two ISO 8601 date strings in hours or minutes.
 * @param {string} start - The starting ISO 8601 date string
 * @param {string} end - The ending ISO 8601 date string
 * @param {'hours' | 'minutes'} unit - The unit of the difference ('hours' or 'minutes')
 * @returns {number} - The difference in the specified unit
 */
export function calculateDateDifference(
    start: string,
    end: string,
    unit: 'hours' | 'minutes',
): number {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();

    if (unit === 'hours') {
        return differenceInMilliseconds / (1000 * 60 * 60);
    } else if (unit === 'minutes') {
        return differenceInMilliseconds / (1000 * 60);
    } else {
        throw new Error("Invalid unit. Use 'hours' or 'minutes'.");
    }
}

/**
 * Calculate the difference between a given ISO 8601 date string and the current date in days.
 * @param {string} start - The starting ISO 8601 date string
 * @returns {number} - The difference in days
 */
function calculateDateDifferenceInDays(start: string): number {
    const startDate = new Date(start);
    const currentDate = new Date();
    const differenceInMilliseconds =
        currentDate.getTime() - startDate.getTime();
    return Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24)) + 1;
}

// Test the functions
const startIsoDate = '2024-08-05T01:12:54.082Z';
const endIsoDate = '2024-08-05T03:18:51.111Z';

const differenceInHours = calculateDateDifference(
    startIsoDate,
    endIsoDate,
    'hours',
);
const differenceInMinutes = calculateDateDifference(
    startIsoDate,
    endIsoDate,
    'minutes',
);

const isoDate = '2024-08-05T01:12:54.082Z';
const formattedDate = formatDate(isoDate);

const differenceInDays = calculateDateDifferenceInDays(startIsoDate);

/**
 * Used to validate a date matches the required format
 *
 * @param {string} dateString The date string to validate
 */
export function checkIfValidDateFormat(dateString) {
    console.log("::: Running checkIfValidDateFormat :::", dateString)

    // Valid format: MM/DD/YYYY
    // (0[1-9]|1[0-2]) = Match any number between 01–09 OR 10–12
    // \/ = Match a /
    // (0[1-9]|1[0-9]|2[0-9]|3[0-1]) = Match any number between 01–09 OR 10–19 OR 20-29 OR 30-31
    // \/ = Match a /
    // (2{1}[0-9]{3}) = Match a number starting with a 2 and 3 following numbers within the range or 0-9
    return /(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(2{1}[0-9]{3})/.test(dateString)
}

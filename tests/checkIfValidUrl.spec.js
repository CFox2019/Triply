import { checkIfValidDateFormat } from '../src/client/js/dateValidator'

describe("Given a date", () => {
    test("it should return true when in expected format", () => {
        const input = '05/14/2020'
        const output = true
        expect(checkIfValidDateFormat(input)).toEqual(output)
    });

    test("it should return false when not in expected format", () => {
        const input = '2020-05-14'
        const output = false
        expect(checkIfValidDateFormat(input)).toEqual(output)
    });
});

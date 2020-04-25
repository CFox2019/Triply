import { checkIfValidUrl } from '../src/client/js/urlValidator'

describe("Given a URL Protocol", () => {
    test("it should return true when containing HTTPS", () => {
        const input = 'https://www.cnn.com/2020/04/15/us/states-reopen-coronavirus-trnd/index.html'
        const output = true
        expect(checkIfValidUrl(input)).toEqual(output)
    });

    test("it should return true when containing HTTP", () => {
        const input = 'http://www.cnn.com/2020/04/15/us/states-reopen-coronavirus-trnd/index.html'
        const output = true
        expect(checkIfValidUrl(input)).toEqual(output)
    });
});

describe("Given a no URL Protocol", () => {
    test("it should return true when the domain contains www.", () => {
        const input = 'www.cnn.com/2020/04/15/us/states-reopen-coronavirus-trnd/index.html'
        const output = true
        expect(checkIfValidUrl(input)).toEqual(output)
    });

    test("it should return true when the domain contains .com", () => {
        const input = 'cnn.com/2020/04/15/us/states-reopen-coronavirus-trnd/index.html'
        const output = true
        expect(checkIfValidUrl(input)).toEqual(output)
    });

    test("it should return true when the domain contains .org", () => {
        const input = 'cnn.org/2020/04/15/us/states-reopen-coronavirus-trnd/index.html'
        const output = true
        expect(checkIfValidUrl(input)).toEqual(output)
    });

    test("it should return true when the domain contains .net", () => {
        const input = 'cnn.net/2020/04/15/us/states-reopen-coronavirus-trnd/index.html'
        const output = true
        expect(checkIfValidUrl(input)).toEqual(output)
    });
});
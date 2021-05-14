function expect(received) {
    const toEqual = (expected) => {
        if (JSON.stringify(received) === JSON.stringify(expected)) {
            return { type: 'success' };
        } else {
            return { type: 'error', message: '' };
        }
    }
    const toBe = (expected) => {
        return { type: 'success' }

    }
    return { toEqual, toBe };
}

let received = { name: "toss" };
let expected = { name: "toss" };
let result = expect(received).toEqual(expected);
console.log(result);
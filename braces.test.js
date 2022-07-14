function is_balanced(inputString, delimiterPair) {
    let stack = [];

    let mapOfClosingToOpening = {}

    for (let i = 0; i < delimiterPair.length; i += 2) {
        mapOfClosingToOpening[delimiterPair[i+1]] = delimiterPair[i];
    }

    for (characterOfInput of inputString) {
        for (let i = 0; i < delimiterPair.length; i += 2) {
            let opening = delimiterPair[i];
            let closing = delimiterPair[i + 1];

            //Object.prototype.keys(mapOfClosingToOpening).contains(characterOfInput)
            if (characterOfInput == opening) {
                stack.push(opening)
            } else if (characterOfInput == closing) {
                if (stack.length > 0 && stack[stack.length - 1] === mapOfClosingToOpening[characterOfInput]) {
                    stack.pop()
                } else {
                    return false
                }
            }
        }
    }
    return stack.length == 0;
}

describe("Should accept balanced sets of delimiters", () => {
    test("without delimiters", () => {
        expect(is_balanced("Sensei says yes!", "()")).toBe(true);
    });
    test("Unnested pair of matching delimiters.", () => {
        expect(is_balanced("(Sensei says yes!)", "()")).toBe(true);
    });

    test("Nested two pairs of matching delimiters.", () => {
        expect(is_balanced("(this is good{!})", "(){}")).toBe(true);
    });

    test("consecutive unnested pairs of matching delimiters.", () => {
        expect(is_balanced("(this is good) (jhjhgj)", "()")).toBe(true);
    });
});

describe("Should reject unclosed delimiters.", () => {
    test("Should reject single opening delimiter.", () => {
        expect(is_balanced("(Sensei says no!", "()")).toBe(false);
    });

    test("Should reject missing nested closing delimiter.", () => {
        expect(is_balanced("(Sensei (says) no!", "()")).toBe(false);
    });

    test("unclosed consecutive unnested delimiters", () => {
        expect(is_balanced("()(", "()")).toBe(false);
    });

});

describe("Should reject unopened delimiter", () => {

    test("should reject a single closing delimiter.", () => {
        expect(is_balanced(")", "()")).toBe(false);
    });

    test("should reject unopened closing (inner) delimiter", () => {
        expect(is_balanced("(this is bad })", "(){}")).toBe(false);
    });

    test("Should reject unopened closing delimiter.", () => {
        expect(is_balanced(")Sensei says no!(", "()")).toBe(false);
    });

});


describe("should fail of unmatching pairs", () => {
    test("consecutive unnested pairs of matching delimiters.", () => {
        expect(is_balanced("(this is good) (but this not}", "(){}")).toBe(false);
    });

    test("wrong order of closing delimiters.", () => {
        expect(is_balanced("(this is good) {(but this not})", "(){}")).toBe(false);
    });
});
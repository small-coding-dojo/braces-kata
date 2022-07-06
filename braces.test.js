function is_balanced(inputString, delimiterPair) {
    for(let i = 0 ; i < delimiterPair.length; i+=2) {
        opening = delimiterPair[i]
        closing = delimiterPair[i+1]
        stack = [];

        for (characterOfInput of inputString) {
            if (characterOfInput == opening) {
                stack.push(opening)
            } else if (characterOfInput == closing) {
                if (typeof (stack.pop()) == "undefined") {
                    return false;
                }
            }
        }
    }
    return stack.length == 0;
}

describe( "Should accept balanced sets of delimiters", () => {
    test("Simple pair of matching delimiters.", () => {
        expect(is_balanced("(Sensei says yes!)", "()")).toBe(true);
    });

    test("Nested two pairs of matching delimiters.", () => {
        expect(is_balanced("(this is good{!})", "(){}")).toBe(true);
    });

});


test("Should reject unclosed delimiters.", () => {
    expect(is_balanced("(Sensei says no!", "()")).toBe(false);
});



describe("Should reject unopened delimiter", () => {

    test("should reject a single closing bracket", () => {
        expect(is_balanced(")", "()")).toBe(false);
    });

    test("should reject unopened closing (inner) delimiter", () => {
        expect(is_balanced("(this is bad })", "(){}")).toBe(false);
    });

    test("Should reject unopened closing delimiter.", () => {
        expect(is_balanced(")Sensei says no!(", "()")).toBe(false);
    });

});

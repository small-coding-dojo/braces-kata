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

test("input contains simple pair of matching opening and closing parentheses => true", () => {
    expect(is_balanced("(Sensei says yes!)", "()")).toBe(true);
});

test("input does not contain matching opening and closing parentheses => false", () => {
    expect(is_balanced("(Sensei says no!", "()")).toBe(false);
});

test("input starts with closing and ends with opening parenthesis => false", () => {
    expect(is_balanced(")Sensei says no!(", "()")).toBe(false);
});

test("should reject a single closing bracket", () => {
    expect(is_balanced(")", "()")).toBe(false);
});

test("two valid inputs return true", () => {
    expect(is_balanced("(this is good{!})", "(){}")).toBe(true);
});

test("this is bad", () => {
    expect(is_balanced("(this is bad })", "(){}")).toBe(false);
});

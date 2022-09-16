is_balanced = require( './is_balanced');

Object.prototype.containsKey = function (key) {
    return typeof this[key] !== "undefined"
}

Object.prototype.containsValue = function (value) {
    return Object.values(this).includes(value)
}


describe("Should find values in hashmaps", () => {
    let mapOfClosingToOpening = {')': '('};

    test("value is present", () => {
        expect(mapOfClosingToOpening.containsValue('(')).toBe(true);
    })
    test("value is not present", () => {
        expect(mapOfClosingToOpening.containsValue(')')).toBe(false);
    })
})

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
        expect(is_balanced("(this 7 is good) (but this not}", "(){}")).toBe(false);
    });

    test("wrong order of closing delimiters.", () => {
        expect(is_balanced("(this is good) {(but this not})", "(){}")).toBe(false);
    });
});

describe("should accept identical deimiters", () => {
    test("pair of matching delimiters.", () => {
        expect(is_balanced("Sensei says -yes-!", "--")).toBe(true);
    });
});

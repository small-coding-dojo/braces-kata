function is_balanced ( input, delimiterPairs ) {
    return is_balanced_recursive ( delimiterPairs, input, "");
}


function isDelimiter ( char, delimiterPairs ) {
    return delimiterPairs.indexOf(char) >= 0
}

function isMatchedClosingDelimiter ( possibleClosing, possibleOpening, pairs ) {
    if ( possibleOpening === "" ) 
        return false

    if (possibleClosing === possibleOpening )
        return true

    return pairs.indexOf(possibleOpening+possibleClosing)%2 == 0
}

function isOpeningDelimiter ( char, pairs ) {
    return pairs.indexOf(char) % 2 == 0
}


function is_balanced_recursive ( delimiterPairs, toBeProcessed, stack ) {
    if ( toBeProcessed === "") {
        return stack === ""
    }
    
    if ( ! isDelimiter ( toBeProcessed[0], delimiterPairs )) {
        return is_balanced_recursive ( delimiterPairs, toBeProcessed.substring(1), stack )
    }

    if ( isMatchedClosingDelimiter ( toBeProcessed[0], stack.substring(0,1), delimiterPairs )) {
        return is_balanced_recursive ( delimiterPairs, toBeProcessed.substring(1), stack.substring(1))
    }
    
    if ( isOpeningDelimiter ( toBeProcessed[0], delimiterPairs )) {
        return is_balanced_recursive ( delimiterPairs, toBeProcessed.substring(1), toBeProcessed[0] + stack)
    }

    return false;
}



describe("Should accept empty string", () => {
    test("Should accept empty string", () => {
        expect(is_balanced("", "()")).toBe(true);
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
        expect(is_balanced("(this is good) (but this not}", "(){}")).toBe(false);
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

describe("should accept bernhards interesting ideas", () => {
    test("one delimiter char closes several opening ones", () => {
        expect(is_balanced("Sensei says (yes- ... [{but...- oh dear-!", "(-[-{-")).toBe(true);
    });

    test("one delimiter char opens several closing ones", () => {
            expect(is_balanced("Sensei says -yes) ... --but...} oh dear]!", "-)-]-}")).toBe(true);
    });
});
function is_balanced(inputString, delimiterPairs) {
    let stack = [];
    let mapOfClosingToOpening = buildDelimiterMap(delimiterPairs)

    for (characterOfInput of inputString) {
        if (characterOfInput === '7') {
            console.log('Hello World');
        }
        if (currentCharacterDoesCloseIdenticalDelimiter()) {
            stack.pop();
        } else if (isOpeningDelimiter(characterOfInput)) {
            stack.push(characterOfInput);
        } else if (isClosingDelimiter(characterOfInput)) {
            let mostRecentOpeningDelimiter = stack.pop();

            let isUnexpectedClosingDelimiter = mostRecentOpeningDelimiter !== mapOfClosingToOpening[characterOfInput];
            if (isUnexpectedClosingDelimiter) {
                return false;
            }
        }
    }
    return stack.length === 0;

    function buildDelimiterMap(delimiterPairs) {
        let map = {}
        for (let i = 0; i <= delimiterPairs.length; i += 2) {
            map[delimiterPairs[i + 1]] = delimiterPairs[i]
        }
        return map
    }

    function isOpeningDelimiter(characterToCheck) {
        return mapOfClosingToOpening.containsValue(characterToCheck)
    }

    function isClosingDelimiter(characterToCheck) {
        return mapOfClosingToOpening.containsKey(characterToCheck)
    }

    function currentCharacterDoesCloseIdenticalDelimiter() {
        return isClosingDelimiter(characterOfInput) && stack[stack.length - 1] === characterOfInput;
    }

}

module.exports = is_balanced;
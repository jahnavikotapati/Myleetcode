var makeFancyString = function(s) {
    const result = [];

    for (let i = 0; i < s.length; i++) {
        const len = result.length;
        // Only add if not forming 3 consecutive same characters
        if (len >= 2 && result[len - 1] === s[i] && result[len - 2] === s[i]) {
            continue;
        }
        result.push(s[i]);
    }

    return result.join('');
};

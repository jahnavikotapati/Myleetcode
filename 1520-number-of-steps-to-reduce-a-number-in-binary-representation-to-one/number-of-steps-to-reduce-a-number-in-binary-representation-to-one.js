var numSteps = function(s) {
    let steps = 0;
    let carry = 0;

    for (let i = s.length - 1; i > 0; i--) {
        let current = Number(s[i]) + carry;

        if (current === 1) {
            steps += 2;
            carry = 1;
        } else {
            steps += 1;
        }
    }

    return steps + carry;
};
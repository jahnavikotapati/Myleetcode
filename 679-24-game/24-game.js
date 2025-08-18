var judgePoint24 = function(cards) {
    const EPSILON = 1e-6;

    const solve = (nums) => {
        if (nums.length === 1) {
            return Math.abs(nums[0] - 24) < EPSILON;
        }
        for (let i = 0; i < nums.length; i++) {
            for (let j = 0; j < nums.length; j++) {
                if (i === j) continue;
                let nextNums = [];
                for (let k = 0; k < nums.length; k++) {
                    if (k !== i && k !== j) {
                        nextNums.push(nums[k]);
                    }
                }
                for (let val of compute(nums[i], nums[j])) {
                    nextNums.push(val);
                    if (solve(nextNums)) return true;
                    nextNums.pop();
                }
            }
        }
        return false;
    };
    const compute = (a, b) => {
        let results = [a + b, a - b, b - a, a * b];
        if (Math.abs(b) > EPSILON) results.push(a / b);
        if (Math.abs(a) > EPSILON) results.push(b / a);
        return results;
    };
    return solve(cards.map(n => n * 1)); // convert to float
};

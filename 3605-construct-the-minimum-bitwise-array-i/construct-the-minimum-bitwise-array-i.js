var minBitwiseArray = function(nums) {
    const res = [];

    for (let x of nums) {
        let found = -1;
        for (let a = 0; a <= x; a++) {
            if ((a | (a + 1)) === x) {
                found = a;
                break;
            }
        }
        res.push(found);
    }

    return res;
};

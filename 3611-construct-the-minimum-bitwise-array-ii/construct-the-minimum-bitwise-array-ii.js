var minBitwiseArray = function(nums) {
    const res = [];

    for (let x of nums) {
        let best = -1;
        if ((x & 1) === 0) {
            res.push(-1);
            continue;
        }
        for (let k = 0; k < 31; k++) {
            let a = x - (1 << k);
            if (a >= 0 && (a | (a + 1)) === x) {
                if (best === -1 || a < best) best = a;
            }
        }
        res.push(best);
    }

    return res;
};

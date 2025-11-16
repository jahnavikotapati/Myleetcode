var numSub = function(s) {
    let mod = 1_000_000_007;
    let count = 0, cur = 0;

    for (let c of s) {
        if (c === '1') {
            cur++;
            count = (count + cur) % mod;
        } else {
            cur = 0;
        }
    }
    return count;
};

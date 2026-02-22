var binaryGap = function(n) {
    let last = -1;
    let pos = 0;
    let ans = 0;
    while (n > 0) {
        if (n & 1) {
            if (last !== -1) ans = Math.max(ans, pos - last);
            last = pos;
        }
        n >>= 1;
        pos++;
    }
    return ans;
};
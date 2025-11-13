var maxOperations = function(s) {
    let ones = 0;
    let ans = 0;
    const n = s.length;
    
    for (let i = 0; i < n; i++) {
        if (s[i] === '1') {
            ones++;
        } else {
            if (i === n - 1 || s[i + 1] === '1') {
                ans += ones;
            }
        }
    }
    return ans;
};

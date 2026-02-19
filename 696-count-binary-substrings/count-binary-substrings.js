var countBinarySubstrings = function(s) {
    let prev = 0, curr = 1, res = 0;

    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) {
            curr++;
        } else {
            res += Math.min(prev, curr);
            prev = curr;
            curr = 1;
        }
    }

    return res + Math.min(prev, curr);
};

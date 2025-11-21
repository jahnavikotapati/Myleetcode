var countPalindromicSubsequence = function(s) {
    let first = Array(26).fill(-1);
    let last = Array(26).fill(-1);
    const a = 'a'.charCodeAt(0);

    for (let i = 0; i < s.length; i++) {
        let c = s.charCodeAt(i) - a;
        if (first[c] === -1) first[c] = i;
        last[c] = i;
    }

    let res = 0;
    for (let c = 0; c < 26; c++) {
        if (first[c] !== -1 && first[c] < last[c]) {
            let set = new Set();
            for (let i = first[c] + 1; i < last[c]; i++) {
                set.add(s[i]);
            }
            res += set.size;
        }
    }
    return res;
};

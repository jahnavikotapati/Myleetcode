var hasAllCodes = function(s, k) {
    if (k > s.length) return false;
    const need = 1 << k;
    const seen = new Array(need).fill(false);
    let mask = 0, all = need, hash = 0;
    for (let i = 0; i < s.length; i++) {
        hash = ((hash << 1) & (need - 1)) | (s[i] === '1');
        if (i >= k - 1 && !seen[hash]) {
            seen[hash] = true;
            all--;
            if (all === 0) return true;
        }
    }
    return false;
};
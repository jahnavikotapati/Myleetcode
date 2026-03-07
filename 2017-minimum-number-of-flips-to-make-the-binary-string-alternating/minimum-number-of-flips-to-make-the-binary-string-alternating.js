var minFlips = function(s) {
    let n = s.length;
    let t = s + s;
    let alt1 = "", alt2 = "";

    for (let i = 0; i < 2 * n; i++) {
        alt1 += i % 2 ? "1" : "0";
        alt2 += i % 2 ? "0" : "1";
    }

    let res = Infinity;
    let diff1 = 0, diff2 = 0;
    let l = 0;

    for (let r = 0; r < 2 * n; r++) {
        if (t[r] !== alt1[r]) diff1++;
        if (t[r] !== alt2[r]) diff2++;

        if (r - l + 1 > n) {
            if (t[l] !== alt1[l]) diff1--;
            if (t[l] !== alt2[l]) diff2--;
            l++;
        }

        if (r - l + 1 === n) {
            res = Math.min(res, diff1, diff2);
        }
    }

    return res;
};
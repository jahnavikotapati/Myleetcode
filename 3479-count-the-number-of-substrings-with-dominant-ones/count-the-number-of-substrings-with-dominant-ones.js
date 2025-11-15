var numberOfSubstrings = function(s) {
    const n = s.length;

    const pref1 = new Array(n + 1).fill(0);
    const zeros = [];
    for (let i = 0; i < n; i++) {
        pref1[i + 1] = pref1[i] + (s[i] === '1');
        if (s[i] === '0') zeros.push(i);
    }
    const Z = zeros.length;

    function lowerBound(arr, target) {
        let lo = 0, hi = arr.length;
        while (lo < hi) {
            let mid = (lo + hi) >> 1;
            if (arr[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }

    function firstR(L, R0, need) {
        const base1 = pref1[L];
        let lo = R0, hi = n - 1, ok = -1;
        while (lo <= hi) {
            let mid = (lo + hi) >> 1;
            let ones = pref1[mid + 1] - base1;
            if (ones >= need) {
                ok = mid;
                hi = mid - 1;
            } else {
                lo = mid + 1;
            }
        }
        return ok;
    }

    let ans = 0;

    for (let L = 0; L < n; L++) {
        let start = lowerBound(zeros, L);

        let Rmax = (start < Z ? zeros[start] - 1 : n - 1);
        if (Rmax >= L) ans += (Rmax - L + 1);

        const maxZ = Math.min(Z - start, 220);

        for (let z = 1; z <= maxZ; z++) {
            const R0 = zeros[start + z - 1];
            const need = z * z;
            const ok = firstR(L, R0, need);
            if (ok === -1) break;
            const Rend = (start + z < Z) ? zeros[start + z] - 1 : n - 1;
            if (ok <= Rend) ans += (Rend - ok + 1);
        }
    }

    return ans;
};

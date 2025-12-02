var countTrapezoids = function(points) {
    const mod = 1_000_000_007n;
    const map = new Map();
    for (const [x, y] of points) {
        if (!map.has(y)) map.set(y, 0);
        map.set(y, map.get(y) + 1);
    }
    const arr = [];
    for (const c of map.values()) if (c >= 2) {
        arr.push(BigInt(c) * BigInt(c - 1) / 2n);
    }
    arr.sort((a, b) => (a < b ? -1 : 1));
    let pref = 0n;
    let ans = 0n;
    for (const v of arr) {
        ans = (ans + v * pref) % mod;
        pref = (pref + v) % mod;
    }
    return Number(ans);
};

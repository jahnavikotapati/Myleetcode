var maximizeSquareArea = function(m, n, hFences, vFences) {
    const MOD = 1000000007n;

    hFences = [1, ...hFences, m].sort((a, b) => a - b);
    vFences = [1, ...vFences, n].sort((a, b) => a - b);

    const hSet = new Set();
    for (let i = 0; i < hFences.length; i++) {
        for (let j = i + 1; j < hFences.length; j++) {
            hSet.add(hFences[j] - hFences[i]);
        }
    }

    let maxSide = 0;
    for (let i = 0; i < vFences.length; i++) {
        for (let j = i + 1; j < vFences.length; j++) {
            let d = vFences[j] - vFences[i];
            if (hSet.has(d)) maxSide = Math.max(maxSide, d);
        }
    }

    if (maxSide === 0) return -1;

    let side = BigInt(maxSide);
    return Number((side * side) % MOD);
};

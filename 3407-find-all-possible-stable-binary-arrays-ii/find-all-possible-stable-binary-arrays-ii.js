var numberOfStableArrays = function(zero, one, limit) {
    const MOD = 1000000007;
    const cols = one + 1;
    const size = (zero + 1) * (one + 1);

    const dp0 = new Int32Array(size);
    const dp1 = new Int32Array(size);

    const idx = (i, j) => i * cols + j;

    for (let i = 1; i <= Math.min(zero, limit); i++) {
        dp0[idx(i, 0)] = 1;
    }

    for (let j = 1; j <= Math.min(one, limit); j++) {
        dp1[idx(0, j)] = 1;
    }

    for (let i = 1; i <= zero; i++) {
        for (let j = 1; j <= one; j++) {
            let v0 = (dp0[idx(i - 1, j)] + dp1[idx(i - 1, j)]) % MOD;
            if (i - limit - 1 >= 0) {
                v0 = (v0 - dp1[idx(i - limit - 1, j)] + MOD) % MOD;
            }
            dp0[idx(i, j)] = v0;

            let v1 = (dp0[idx(i, j - 1)] + dp1[idx(i, j - 1)]) % MOD;
            if (j - limit - 1 >= 0) {
                v1 = (v1 - dp0[idx(i, j - limit - 1)] + MOD) % MOD;
            }
            dp1[idx(i, j)] = v1;
        }
    }

    return (dp0[idx(zero, one)] + dp1[idx(zero, one)]) % MOD;
};
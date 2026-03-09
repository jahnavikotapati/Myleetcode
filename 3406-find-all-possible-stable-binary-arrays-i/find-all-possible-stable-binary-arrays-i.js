var numberOfStableArrays = function(zero, one, limit) {
    const MOD = 1000000007;

    const dp0 = Array.from({length: zero + 1}, () => Array(one + 1).fill(0));
    const dp1 = Array.from({length: zero + 1}, () => Array(one + 1).fill(0));

    for (let i = 1; i <= Math.min(zero, limit); i++) dp0[i][0] = 1;
    for (let j = 1; j <= Math.min(one, limit); j++) dp1[0][j] = 1;

    for (let i = 0; i <= zero; i++) {
        for (let j = 0; j <= one; j++) {
            if (i > 0) {
                for (let k = 1; k <= limit && k <= i; k++) {
                    if (j >= 0) dp0[i][j] = (dp0[i][j] + dp1[i-k][j]) % MOD;
                }
            }

            if (j > 0) {
                for (let k = 1; k <= limit && k <= j; k++) {
                    if (i >= 0) dp1[i][j] = (dp1[i][j] + dp0[i][j-k]) % MOD;
                }
            }
        }
    }

    return (dp0[zero][one] + dp1[zero][one]) % MOD;
};
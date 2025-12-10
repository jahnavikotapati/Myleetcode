var countPermutations = function(complexity) {
    const n = complexity.length;
    for (let i = 1; i < n; i++) if (complexity[0] >= complexity[i]) return 0;
    const MOD = 1000000007n;
    let ans = 1n;
    for (let i = 1; i <= n - 1; i++) ans = (ans * BigInt(i)) % MOD;
    return Number(ans);
};

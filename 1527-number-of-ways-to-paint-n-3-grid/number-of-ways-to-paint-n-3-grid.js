var numOfWays = function(n) {
    const MOD = 1000000007;
    let aba = 6;
    let abc = 6;
    for (let i = 2; i <= n; i++) {
        const newAba = (aba * 3 + abc * 2) % MOD;
        const newAbc = (aba * 2 + abc * 2) % MOD;
        aba = newAba;
        abc = newAbc;
    }
    return (aba + abc) % MOD;
};

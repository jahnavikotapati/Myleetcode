var concatenatedBinary = function(n) {
    const MOD = 1000000007n;
    let result = 0n;
    let length = 0n;

    for (let i = 1n; i <= BigInt(n); i++) {
        if ((i & (i - 1n)) === 0n) length++;
        result = ((result << length) + i) % MOD;
    }

    return Number(result);
};
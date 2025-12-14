var numberOfWays = function(corridor) {
    const MOD = 1000000007;
    let seats = 0;
    let ways = 1;
    let plants = 0;

    for (let c of corridor) {
        if (c === 'S') {
            seats++;
            if (seats > 2 && seats % 2 === 1) {
                ways = (ways * (plants + 1)) % MOD;
                plants = 0;
            }
        } else if (seats >= 2 && seats % 2 === 0) {
            plants++;
        }
    }

    return seats % 2 === 0 && seats > 0 ? ways : 0;
};

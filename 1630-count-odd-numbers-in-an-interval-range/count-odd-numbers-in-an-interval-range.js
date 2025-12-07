var countOdds = function(low, high) {
    const f = x => Math.floor((x + 1) / 2);
    return f(high) - f(low - 1);
};

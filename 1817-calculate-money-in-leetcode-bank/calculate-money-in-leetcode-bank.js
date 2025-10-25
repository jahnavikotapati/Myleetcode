var totalMoney = function(n) {
    let weeks = Math.floor(n / 7);
    let days = n % 7;
    let total = 28 * weeks + 7 * (weeks * (weeks - 1)) / 2;
    for (let i = 0; i < days; i++) total += weeks + 1 + i;
    return total;
};

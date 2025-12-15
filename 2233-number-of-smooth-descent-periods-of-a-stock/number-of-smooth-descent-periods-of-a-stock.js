var getDescentPeriods = function(prices) {
    let res = 1;
    let len = 1;

    for (let i = 1; i < prices.length; i++) {
        if (prices[i - 1] - prices[i] === 1) {
            len++;
        } else {
            len = 1;
        }
        res += len;
    }

    return res;
};

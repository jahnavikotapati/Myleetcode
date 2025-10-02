var maxBottlesDrunk = function(numBottles, numExchange) {
    let res = numBottles, empty = numBottles;
    while (empty >= numExchange) {
        empty -= numExchange;
        numExchange++;
        res++;
        empty++;
    }
    return res;
};

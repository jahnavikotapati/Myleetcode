function minCost(basket1, basket2) {
    const count = new Map();
    for (let num of basket1) count.set(num, (count.get(num) || 0) + 1);
    for (let num of basket2) count.set(num, (count.get(num) || 0) - 1);
    const toSwap = [];
    let minElem = Infinity;
    for (let [key, val] of count.entries()) {
        if (val % 2 !== 0) return -1; 
        for (let i = 0; i < Math.abs(val / 2); i++) {
            toSwap.push(key);
        }
        minElem = Math.min(minElem, key);
    }
    toSwap.sort((a, b) => a - b);
    let cost = 0;
    for (let i = 0; i < toSwap.length / 2; i++) {
        cost += Math.min(toSwap[i], 2 * minElem);
    }
    return cost;
}

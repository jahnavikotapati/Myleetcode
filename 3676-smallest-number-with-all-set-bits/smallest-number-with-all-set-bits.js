var smallestNumber = function(n) {
    let bits = n.toString(2).length;
    let x = (1 << bits) - 1;
    return x >= n ? x : (1 << (bits + 1)) - 1;
};

var smallestRepunitDivByK = function(k) {
    if (k % 2 === 0 || k % 5 === 0) return -1;
    
    let rem = 0;
    for (let length = 1; length <= k; length++) {
        rem = (rem * 10 + 1) % k;
        if (rem === 0) return length;
    }
    return -1;
};

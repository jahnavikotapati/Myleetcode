var makeTheIntegerZero = function(num1, num2) {
    for (let k = 1; k <= 60; k++) {
        let target = num1 - k * num2;
        if (target < k) continue; 
        let bitCount = target.toString(2).split('1').length - 1; 
        if (bitCount <= k) return k;
    }
    return -1;
};

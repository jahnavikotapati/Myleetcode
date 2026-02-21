var countPrimeSetBits = function(left, right) {
    const primes = new Set([2,3,5,7,11,13,17,19]);
    let ans = 0;
    for (let x = left; x <= right; x++) {
        if (primes.has(x.toString(2).split('1').length - 1)) ans++;
    }
    return ans;
};
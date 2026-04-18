var mirrorDistance = function(n) {
    let rev = 0, x = n;
    while (x > 0) {
        rev = rev * 10 + (x % 10);
        x = Math.floor(x / 10);
    }
    return Math.abs(n - rev);
};
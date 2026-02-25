var sortByBits = function(arr) {
    const bitCount = (n) => {
        let c = 0;
        while (n) {
            n &= n - 1;
            c++;
        }
        return c;
    };

    return arr.sort((a, b) => {
        const ca = bitCount(a);
        const cb = bitCount(b);
        return ca === cb ? a - b : ca - cb;
    });
};
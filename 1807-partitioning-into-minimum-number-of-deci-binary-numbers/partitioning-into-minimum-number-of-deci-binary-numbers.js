var minPartitions = function(n) {
    let maxDigit = 0;

    for (let ch of n) {
        if (ch > maxDigit) maxDigit = ch;
    }

    return Number(maxDigit);
};
var minSwaps = function(grid) {
    const n = grid.length;
    const zeros = [];

    for (let row of grid) {
        let count = 0;
        for (let j = n - 1; j >= 0 && row[j] === 0; j--) count++;
        zeros.push(count);
    }

    let swaps = 0;

    for (let i = 0; i < n; i++) {
        let need = n - 1 - i;
        let j = i;

        while (j < n && zeros[j] < need) j++;
        if (j === n) return -1;

        while (j > i) {
            [zeros[j], zeros[j - 1]] = [zeros[j - 1], zeros[j]];
            swaps++;
            j--;
        }
    }

    return swaps;
};
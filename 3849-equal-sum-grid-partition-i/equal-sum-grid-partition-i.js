var canPartitionGrid = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    let total = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            total += grid[i][j];
        }
    }

    if (total % 2 !== 0) return false;

    const target = total / 2;

    let rowSum = 0;
    for (let i = 0; i < m - 1; i++) {
        for (let j = 0; j < n; j++) {
            rowSum += grid[i][j];
        }
        if (rowSum === target) return true;
    }

    let colSums = new Array(n).fill(0);
    for (let j = 0; j < n; j++) {
        for (let i = 0; i < m; i++) {
            colSums[j] += grid[i][j];
        }
    }

    let colPrefix = 0;
    for (let j = 0; j < n - 1; j++) {
        colPrefix += colSums[j];
        if (colPrefix === target) return true;
    }

    return false;
};
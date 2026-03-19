var numberOfSubmatrices = function(grid) {
    const m = grid.length, n = grid[0].length;
    let result = 0;

    const balance = Array.from({length: m}, () => Array(n).fill(0));
    const xCount = Array.from({length: m}, () => Array(n).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let val = grid[i][j] === 'X' ? 1 : grid[i][j] === 'Y' ? -1 : 0;
            let x = grid[i][j] === 'X' ? 1 : 0;

            balance[i][j] = val;
            xCount[i][j] = x;

            if (i > 0) {
                balance[i][j] += balance[i - 1][j];
                xCount[i][j] += xCount[i - 1][j];
            }
            if (j > 0) {
                balance[i][j] += balance[i][j - 1];
                xCount[i][j] += xCount[i][j - 1];
            }
            if (i > 0 && j > 0) {
                balance[i][j] -= balance[i - 1][j - 1];
                xCount[i][j] -= xCount[i - 1][j - 1];
            }

            if (balance[i][j] === 0 && xCount[i][j] > 0) result++;
        }
    }

    return result;
};
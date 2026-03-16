var getBiggestThree = function(grid) {
    const m = grid.length, n = grid[0].length;
    const set = new Set();

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            set.add(grid[i][j]);

            let maxSize = Math.min(j, n - j - 1, Math.floor((m - i - 1) / 2));

            for (let k = 1; k <= maxSize; k++) {
                if (i + 2 * k >= m) break;

                let sum = 0;
                let x = i, y = j;

                for (let d = 0; d < k; d++) sum += grid[x + d][y + d];
                for (let d = 0; d < k; d++) sum += grid[x + k + d][y + k - d];
                for (let d = 0; d < k; d++) sum += grid[x + 2 * k - d][y - d];
                for (let d = 0; d < k; d++) sum += grid[x + k - d][y - k + d];

                set.add(sum);
            }
        }
    }

    return Array.from(set).sort((a, b) => b - a).slice(0, 3);
};
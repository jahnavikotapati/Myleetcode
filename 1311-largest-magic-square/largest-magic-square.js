var largestMagicSquare = function(grid) {
    const m = grid.length, n = grid[0].length;

    const row = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    const col = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    const diag1 = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    const diag2 = Array.from({ length: m + 2 }, () => Array(n + 2).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            row[i + 1][j + 1] = row[i + 1][j] + grid[i][j];
            col[i + 1][j + 1] = col[i][j + 1] + grid[i][j];
            diag1[i + 1][j + 1] = diag1[i][j] + grid[i][j];
            diag2[i + 1][j + 1] = diag2[i][j + 2] + grid[i][j];
        }
    }

    for (let k = Math.min(m, n); k >= 2; k--) {
        for (let i = 0; i + k <= m; i++) {
            for (let j = 0; j + k <= n; j++) {
                let sum = row[i + 1][j + k] - row[i + 1][j];
                let ok = true;

                for (let r = 0; r < k && ok; r++) {
                    if (row[i + r + 1][j + k] - row[i + r + 1][j] !== sum) ok = false;
                }
                for (let c = 0; c < k && ok; c++) {
                    if (col[i + k][j + c + 1] - col[i][j + c + 1] !== sum) ok = false;
                }

                let d1 = diag1[i + k][j + k] - diag1[i][j];
                let d2 = diag2[i + k][j + 1] - diag2[i][j + k + 1];
                if (d1 !== sum || d2 !== sum) ok = false;

                if (ok) return k;
            }
        }
    }

    return 1;
};

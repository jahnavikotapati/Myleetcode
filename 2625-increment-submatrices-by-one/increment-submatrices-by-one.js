var rangeAddQueries = function(n, queries) {
    const diff = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

    for (const [r1, c1, r2, c2] of queries) {
        diff[r1][c1] += 1;
        if (c2 + 1 < n) diff[r1][c2 + 1] -= 1;
        if (r2 + 1 < n) diff[r2 + 1][c1] -= 1;
        if (r2 + 1 < n && c2 + 1 < n) diff[r2 + 1][c2 + 1] += 1;
    }

    // Build final matrix using prefix sums
    const mat = Array.from({ length: n }, () => Array(n).fill(0));
    for (let r = 0; r < n; r++) {
        for (let c = 1; c < n; c++) {
            diff[r][c] += diff[r][c - 1];
        }
    }

    for (let c = 0; c < n; c++) {
        for (let r = 1; r < n; r++) {
            diff[r][c] += diff[r - 1][c];
        }
    }

    // Copy to output
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            mat[r][c] = diff[r][c];
        }
    }

    return mat;
};

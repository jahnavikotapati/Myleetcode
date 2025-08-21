var numSubmat = function(mat) {
    let m = mat.length, n = mat[0].length;
    let heights = Array(n).fill(0);
    let total = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (mat[i][j] === 1) {
                heights[j] += 1;
            } else {
                heights[j] = 0;
            }
        }
        for (let j = 0; j < n; j++) {
            let minHeight = heights[j];
            for (let k = j; k >= 0 && minHeight > 0; k--) {
                minHeight = Math.min(minHeight, heights[k]);
                total += minHeight;
            }
        }
    }

    return total;
};

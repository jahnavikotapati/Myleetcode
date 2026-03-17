var largestSubmatrix = function(matrix) {
    const m = matrix.length, n = matrix[0].length;
    const heights = new Array(n).fill(0);
    let ans = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            heights[j] = matrix[i][j] === 0 ? 0 : heights[j] + 1;
        }

        const sorted = [...heights].sort((a, b) => b - a);

        for (let k = 0; k < n; k++) {
            ans = Math.max(ans, sorted[k] * (k + 1));
        }
    }

    return ans;
};
var countSquares = function(matrix) {
    let m = matrix.length;
    let n = matrix[0].length;
    let dp = Array.from({length: m}, () => Array(n).fill(0));
    let total = 0;
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] == 1) {
                if (i === 0 || j === 0) {
                    dp[i][j] = 1; 
                } else {
                    dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
                }
                total += dp[i][j];
            }
        }
    }
    
    return total;
};

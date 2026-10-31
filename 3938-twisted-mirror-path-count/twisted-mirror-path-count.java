
class Solution {
    public int uniquePaths(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        int MOD = 1_000_000_007;

        long[][] right = new long[m][n];
        long[][] down = new long[m][n];

        // First moves from the starting cell
        if (n > 1) right[0][1] = 1;
        if (m > 1) down[1][0] = 1;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                long r = right[i][j];
                long d = down[i][j];

                if (grid[i][j] == 1) {
                    // Right into mirror -> turn down
                    if (i + 1 < m) {
                        down[i + 1][j] =
                            (down[i + 1][j] + r) % MOD;
                    }

                    // Down into mirror -> turn right
                    if (j + 1 < n) {
                        right[i][j + 1] =
                            (right[i][j + 1] + d) % MOD;
                    }
                } else {
                    long ways = (r + d) % MOD;

                    // From an empty cell, choose right
                    if (j + 1 < n) {
                        right[i][j + 1] =
                            (right[i][j + 1] + ways) % MOD;
                    }

                    // Or choose down
                    if (i + 1 < m) {
                        down[i + 1][j] =
                            (down[i + 1][j] + ways) % MOD;
                    }
                }
            }
        }

        return (int) ((right[m - 1][n - 1]
                    + down[m - 1][n - 1]) % MOD);
    }
}

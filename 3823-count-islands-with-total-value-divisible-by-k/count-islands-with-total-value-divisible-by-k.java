class Solution {
    public int countIslands(int[][] grid, int k) {
        int m = grid.length;
        int n = grid[0].length;
        int count = 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] > 0) {
                    long sum = dfs(grid, i, j);

                    if (sum % k == 0) {
                        count++;
                    }
                }
            }
        }

        return count;
    }

    private long dfs(int[][] grid, int i, int j) {
        int m = grid.length;
        int n = grid[0].length;

        if (i < 0 || i >= m || j < 0 || j >= n
                || grid[i][j] == 0) {
            return 0;
        }

        int value = grid[i][j];
        grid[i][j] = 0; // Mark as visited

        long sum = value;

        sum += dfs(grid, i - 1, j); // Up
        sum += dfs(grid, i + 1, j); // Down
        sum += dfs(grid, i, j - 1); // Left
        sum += dfs(grid, i, j + 1); // Right

        return sum;
    }
}
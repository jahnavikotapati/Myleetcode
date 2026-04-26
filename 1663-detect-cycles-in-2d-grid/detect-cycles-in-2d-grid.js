var containsCycle = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    const visited = Array.from({ length: m }, () => Array(n).fill(false));

    const directions = [
        [1, 0],  // down
        [-1, 0], // up
        [0, 1],  // right
        [0, -1]  // left
    ];

    function dfs(x, y, parentX, parentY, char) {
        if (visited[x][y]) return true;

        visited[x][y] = true;

        for (let [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (
                nx >= 0 && ny >= 0 &&
                nx < m && ny < n &&
                grid[nx][ny] === char
            ) {
                // skip parent
                if (nx === parentX && ny === parentY) continue;

                if (dfs(nx, ny, x, y, char)) {
                    return true;
                }
            }
        }

        return false;
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (!visited[i][j]) {
                if (dfs(i, j, -1, -1, grid[i][j])) {
                    return true;
                }
            }
        }
    }

    return false;
};
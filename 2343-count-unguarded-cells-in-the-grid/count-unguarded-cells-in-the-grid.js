var countUnguarded = function(m, n, guards, walls) {
    const grid = Array.from({ length: m }, () => Array(n).fill(0));
    for (const [r, c] of walls) grid[r][c] = 2;
    for (const [r, c] of guards) grid[r][c] = 1;

    const dirs = [[0,1],[1,0],[0,-1],[-1,0]];
    for (const [r, c] of guards) {
        for (const [dr, dc] of dirs) {
            let nr = r + dr, nc = c + dc;
            while (0 <= nr && nr < m && 0 <= nc && nc < n && grid[nr][nc] !== 1 && grid[nr][nc] !== 2) {
                if (grid[nr][nc] === 0) grid[nr][nc] = 3;
                nr += dr; nc += dc;
            }
        }
    }

    let count = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 0) count++;
        }
    }
    return count;
};

var latestDayToCross = function(row, col, cells) {
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    
    const canCross = (day) => {
        const grid = Array.from({ length: row }, () => Array(col).fill(0));
        for (let i = 0; i < day; i++) {
            const [r, c] = cells[i];
            grid[r - 1][c - 1] = 1;
        }
        const queue = [];
        const visited = Array.from({ length: row }, () => Array(col).fill(false));
        for (let j = 0; j < col; j++) {
            if (grid[0][j] === 0) {
                queue.push([0, j]);
                visited[0][j] = true;
            }
        }
        while (queue.length) {
            const [x, y] = queue.shift();
            if (x === row - 1) return true;
            for (const [dx, dy] of dirs) {
                const nx = x + dx, ny = y + dy;
                if (nx >= 0 && nx < row && ny >= 0 && ny < col &&
                    !visited[nx][ny] && grid[nx][ny] === 0) {
                    visited[nx][ny] = true;
                    queue.push([nx, ny]);
                }
            }
        }
        return false;
    };
    
    let left = 1, right = cells.length, ans = 0;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (canCross(mid)) {
            ans = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return ans;
};

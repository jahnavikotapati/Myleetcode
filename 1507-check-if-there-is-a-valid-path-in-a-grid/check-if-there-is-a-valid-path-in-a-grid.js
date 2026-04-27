var hasValidPath = function(grid) {
    const m = grid.length, n = grid[0].length;

    const dirs = {
        1: [[0, -1], [0, 1]],
        2: [[-1, 0], [1, 0]],
        3: [[0, -1], [1, 0]],
        4: [[0, 1], [1, 0]],
        5: [[0, -1], [-1, 0]],
        6: [[0, 1], [-1, 0]]
    };

    const opposite = (dx, dy) => [-dx, -dy];

    const inBounds = (x, y) => x >= 0 && y >= 0 && x < m && y < n;

    const visited = Array.from({ length: m }, () => Array(n).fill(false));
    const queue = [[0, 0]];
    visited[0][0] = true;

    while (queue.length) {
        const [x, y] = queue.shift();
        if (x === m - 1 && y === n - 1) return true;

        for (const [dx, dy] of dirs[grid[x][y]]) {
            const nx = x + dx, ny = y + dy;
            if (!inBounds(nx, ny) || visited[nx][ny]) continue;

            const [odx, ody] = opposite(dx, dy);
            let valid = false;

            for (const [ndx, ndy] of dirs[grid[nx][ny]]) {
                if (ndx === odx && ndy === ody) {
                    valid = true;
                    break;
                }
            }

            if (valid) {
                visited[nx][ny] = true;
                queue.push([nx, ny]);
            }
        }
    }

    return false;
};
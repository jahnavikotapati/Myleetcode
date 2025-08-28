var sortMatrix = function(grid) {
    const n = grid.length;
    const diagonals = new Map();

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const key = i - j;
            if (!diagonals.has(key)) diagonals.set(key, []);
            diagonals.get(key).push(grid[i][j]);
        }
    }
    for (let [key, arr] of diagonals) {
        if (key >= 0) {
            arr.sort((a, b) => b - a);
        } else {
            arr.sort((a, b) => a - b);
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const key = i - j;
            grid[i][j] = diagonals.get(key).shift(); 
        }
    }

    return grid;
};

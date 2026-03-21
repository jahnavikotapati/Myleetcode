var reverseSubmatrix = function(grid, x, y, k) {
    let top = x, bottom = x + k - 1;

    while (top < bottom) {
        for (let j = y; j < y + k; j++) {
            [grid[top][j], grid[bottom][j]] = [grid[bottom][j], grid[top][j]];
        }
        top++;
        bottom--;
    }

    return grid;
};
var minimumArea = function(grid) {
    let rows = grid.length, cols = grid[0].length;

    let minRow = rows, maxRow = -1;
    let minCol = cols, maxCol = -1;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 1) {
                minRow = Math.min(minRow, r);
                maxRow = Math.max(maxRow, r);
                minCol = Math.min(minCol, c);
                maxCol = Math.max(maxCol, c);
            }
        }
    }
    return (maxRow - minRow + 1) * (maxCol - minCol + 1);
};

var maxMatrixSum = function(matrix) {
    let total = 0;
    let minAbs = Infinity;
    let negatives = 0;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            let v = matrix[i][j];
            if (v < 0) negatives++;
            let a = Math.abs(v);
            total += a;
            if (a < minAbs) minAbs = a;
        }
    }

    if (negatives % 2 === 1) {
        total -= 2 * minAbs;
    }

    return total;
};

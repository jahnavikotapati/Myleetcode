var rotateTheBox = function(boxGrid) {
    let m = boxGrid.length, n = boxGrid[0].length;

    for (let i = 0; i < m; i++) {
        let write = n - 1;
        for (let j = n - 1; j >= 0; j--) {
            if (boxGrid[i][j] === '*') {
                write = j - 1;
            } else if (boxGrid[i][j] === '#') {
                [boxGrid[i][j], boxGrid[i][write]] = ['.', '#'];
                write--;
            }
        }
    }

    let res = Array.from({ length: n }, () => Array(m));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            res[j][m - 1 - i] = boxGrid[i][j];
        }
    }

    return res;
};
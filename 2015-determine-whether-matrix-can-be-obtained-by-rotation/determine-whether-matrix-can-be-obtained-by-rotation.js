var findRotation = function(mat, target) {
    const n = mat.length;

    const rotate = (g) => {
        let res = Array.from({length: n}, () => Array(n).fill(0));
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                res[j][n - 1 - i] = g[i][j];
            }
        }
        return res;
    };

    const same = (a, b) => {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (a[i][j] !== b[i][j]) return false;
            }
        }
        return true;
    };

    for (let k = 0; k < 4; k++) {
        if (same(mat, target)) return true;
        mat = rotate(mat);
    }

    return false;
};
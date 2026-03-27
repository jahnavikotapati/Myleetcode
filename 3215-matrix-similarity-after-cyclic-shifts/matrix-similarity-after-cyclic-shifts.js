var areSimilar = function(mat, k) {
    const m = mat.length, n = mat[0].length;
    k %= n;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let nj;
            if (i % 2 === 0) {
                nj = (j + k) % n;
            } else {
                nj = (j - k + n) % n;
            }
            if (mat[i][j] !== mat[i][nj]) return false;
        }
    }

    return true;
};
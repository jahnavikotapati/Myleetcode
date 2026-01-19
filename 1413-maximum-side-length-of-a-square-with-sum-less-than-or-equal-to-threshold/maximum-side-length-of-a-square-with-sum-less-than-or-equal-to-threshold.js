var maxSideLength = function(mat, threshold) {
    const m = mat.length, n = mat[0].length;
    const ps = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            ps[i][j] = mat[i - 1][j - 1]
                + ps[i - 1][j]
                + ps[i][j - 1]
                - ps[i - 1][j - 1];
        }
    }

    let left = 0, right = Math.min(m, n);
    while (left < right) {
        let mid = Math.floor((left + right + 1) / 2);
        let ok = false;

        for (let i = mid; i <= m && !ok; i++) {
            for (let j = mid; j <= n; j++) {
                let sum = ps[i][j] - ps[i - mid][j] - ps[i][j - mid] + ps[i - mid][j - mid];
                if (sum <= threshold) {
                    ok = true;
                    break;
                }
            }
        }

        if (ok) left = mid;
        else right = mid - 1;
    }

    return left;
};

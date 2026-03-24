var constructProductMatrix = function(grid) {
    const MOD = 12345;
    const m = grid.length, n = grid[0].length;

    let arr = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            arr.push(grid[i][j] % MOD);
        }
    }

    const size = arr.length;
    const prefix = new Array(size).fill(1);
    const suffix = new Array(size).fill(1);

    for (let i = 1; i < size; i++) {
        prefix[i] = (prefix[i - 1] * arr[i - 1]) % MOD;
    }

    for (let i = size - 2; i >= 0; i--) {
        suffix[i] = (suffix[i + 1] * arr[i + 1]) % MOD;
    }

    let res = Array.from({length: m}, () => Array(n).fill(0));
    let idx = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            res[i][j] = (prefix[idx] * suffix[idx]) % MOD;
            idx++;
        }
    }

    return res;
};
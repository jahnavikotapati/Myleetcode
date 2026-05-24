var maxJumps = function(arr, d) {
    const n = arr.length;
    const dp = new Array(n).fill(0);

    const dfs = (i) => {
        if (dp[i]) return dp[i];

        let ans = 1;

        for (let j = i - 1; j >= Math.max(0, i - d); j--) {
            if (arr[j] >= arr[i]) break;
            ans = Math.max(ans, 1 + dfs(j));
        }

        for (let j = i + 1; j <= Math.min(n - 1, i + d); j++) {
            if (arr[j] >= arr[i]) break;
            ans = Math.max(ans, 1 + dfs(j));
        }

        dp[i] = ans;
        return ans;
    };

    let res = 1;

    for (let i = 0; i < n; i++) {
        res = Math.max(res, dfs(i));
    }

    return res;
};
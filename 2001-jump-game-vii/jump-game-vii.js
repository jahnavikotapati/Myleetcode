var canReach = function(s, minJump, maxJump) {
    const n = s.length;
    const dp = new Array(n).fill(false);
    dp[0] = true;

    let reachable = 0;

    for (let i = 1; i < n; i++) {
        if (i - minJump >= 0 && dp[i - minJump]) {
            reachable++;
        }

        if (i - maxJump - 1 >= 0 && dp[i - maxJump - 1]) {
            reachable--;
        }

        dp[i] = reachable > 0 && s[i] === '0';
    }

    return dp[n - 1];
};
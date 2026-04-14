var minimumTotalDistance = function(robot, factory) {
    robot.sort((a, b) => a - b);
    factory.sort((a, b) => a[0] - b[0]);

    let m = robot.length;
    let n = factory.length;

    let memo = Array.from({ length: m }, () => Array(n).fill(-1));

    function dfs(i, j) {
        if (i === m) return 0;
        if (j === n) return Infinity;
        if (memo[i][j] !== -1) return memo[i][j];

        let res = dfs(i, j + 1);

        let pos = factory[j][0];
        let limit = factory[j][1];

        let cost = 0;
        for (let k = 0; k < limit && i + k < m; k++) {
            cost += Math.abs(robot[i + k] - pos);
            res = Math.min(res, cost + dfs(i + k + 1, j + 1));
        }

        memo[i][j] = res;
        return res;
    }

    return dfs(0, 0);
};
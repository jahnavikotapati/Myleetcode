function combinationSum3(k, n) {
    const result = [];

    function backtrack(start, path, sum) {
        if (path.length === k && sum === n) {
            result.push([...path]);
            return;
        }

        if (path.length > k || sum > n) return;

        for (let i = start; i <= 9; i++) {
            path.push(i);
            backtrack(i + 1, path, sum + i); // move to next number
            path.pop(); // backtrack
        }
    }

    backtrack(1, [], 0);
    return result;
}

var countMaxOrSubsets = function(nums) {
    let maxOr = 0;
    let count = 0;
    for (let num of nums) {
        maxOr |= num;
    }
    const dfs = (i, currentOr) => {
        if (i === nums.length) {
            if (currentOr === maxOr) count++;
            return;
        }
        dfs(i + 1, currentOr | nums[i]);
        dfs(i + 1, currentOr);
    };
    dfs(0, 0);
    return count;
};

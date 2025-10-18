var maxDistinctElements = function(nums, k) {
    nums.sort((a, b) => a - b);
    let res = 0, prev = -Infinity;
    for (let x of nums) {
        let start = Math.max(prev + 1, x - k);
        if (start <= x + k) {
            res++;
            prev = start;
        }
    }
    return res;
};

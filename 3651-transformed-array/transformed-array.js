var constructTransformedArray = function(nums) {
    const n = nums.length;
    const result = new Array(n);

    for (let i = 0; i < n; i++) {
        if (nums[i] === 0) {
            result[i] = 0;
        } else {
            const move = nums[i];
            const nextIndex = ((i + move) % n + n) % n;
            result[i] = nums[nextIndex];
        }
    }

    return result;
};

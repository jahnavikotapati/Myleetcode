var isGood = function(nums) {
    nums.sort((a, b) => a - b);

    const n = nums.length - 1;

    if (nums[n] !== n) return false;
    if (nums[n - 1] !== n) return false;

    for (let i = 0; i < n - 1; i++) {
        if (nums[i] !== i + 1) return false;
    }

    return true;
};
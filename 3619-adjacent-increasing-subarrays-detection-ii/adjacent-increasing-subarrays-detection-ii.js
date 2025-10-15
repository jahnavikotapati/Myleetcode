var maxIncreasingSubarrays = function(nums) {
    const n = nums.length;
    let left = new Array(n).fill(1);
    for (let i = 1; i < n; i++) {
        if (nums[i] > nums[i - 1]) left[i] = left[i - 1] + 1;
    }
    let right = new Array(n).fill(1);
    for (let i = n - 2; i >= 0; i--) {
        if (nums[i] < nums[i + 1]) right[i] = right[i + 1] + 1;
    }
    let ans = 0;
    for (let t = 0; t < n - 1; t++) {
        ans = Math.max(ans, Math.min(left[t], right[t + 1]));
    }
    return ans;
};

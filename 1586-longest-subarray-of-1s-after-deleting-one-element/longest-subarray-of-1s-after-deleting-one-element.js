var longestSubarray = function(nums) {
    let left = 0, zeroCount = 0, maxLen = 0;

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) {
            zeroCount++;
        }

        while (zeroCount > 1) {
            if (nums[left] === 0) {
                zeroCount--;
            }
            left++;
        }

        // window length minus 1 (because we must delete one element)
        maxLen = Math.max(maxLen, right - left);
    }

    return maxLen;
};

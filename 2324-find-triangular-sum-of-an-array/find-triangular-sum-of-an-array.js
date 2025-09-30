var triangularSum = function(nums) {
    while (nums.length > 1) {
        let temp = []
        for (let i = 0; i < nums.length - 1; i++) {
            temp.push((nums[i] + nums[i + 1]) % 10)
        }
        nums = temp
    }
    return nums[0]
};

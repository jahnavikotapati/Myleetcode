var isTrionic = function(nums) {
    const n = nums.length;
    if (n < 3) return false;

    let i = 1;

    while (i < n && nums[i] > nums[i - 1]) i++;
    if (i === 1 || i === n) return false;

    let p = i;

    while (i < n && nums[i] < nums[i - 1]) i++;
    if (i === p || i === n) return false;

    while (i < n && nums[i] > nums[i - 1]) i++;

    return i === n;
};

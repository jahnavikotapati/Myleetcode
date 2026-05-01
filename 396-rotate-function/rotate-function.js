var maxRotateFunction = function(nums) {
    let n = nums.length;
    let sum = 0;
    let f = 0;

    for (let i = 0; i < n; i++) {
        sum += nums[i];
        f += i * nums[i];
    }

    let res = f;

    for (let k = 1; k < n; k++) {
        f = f + sum - n * nums[n - k];
        if (f > res) res = f;
    }

    return res;
};
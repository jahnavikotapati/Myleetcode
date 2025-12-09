var specialTriplets = function(nums) {
    const MOD = 1_000_000_007;
    let n = nums.length;
    let left = {}, right = {};
    for (let x of nums) right[x] = (right[x] || 0) + 1;

    let ans = 0;
    for (let j = 0; j < n; j++) {
        let mid = nums[j];
        right[mid]--;
        if (right[mid] === 0) delete right[mid];

        let need = mid * 2;
        let c1 = left[need] || 0;
        let c2 = right[need] || 0;
        ans = (ans + c1 * c2) % MOD;

        left[mid] = (left[mid] || 0) + 1;
    }
    return ans;
};

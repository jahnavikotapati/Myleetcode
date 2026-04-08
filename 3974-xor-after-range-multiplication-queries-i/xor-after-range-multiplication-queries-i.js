var xorAfterQueries = function(nums, queries) {
    const MOD = 1000000007;
    
    for (let [l, r, k, v] of queries) {
        for (let i = l; i <= r; i += k) {
            nums[i] = (nums[i] * v) % MOD;
        }
    }
    
    let res = 0;
    for (let num of nums) {
        res ^= num;
    }
    
    return res;
};
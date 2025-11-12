var minOperations = function(nums) {
    let n = nums.length;
    let oneCount = nums.filter(x => x === 1).length;
    if (oneCount > 0) return n - oneCount;
    let res = Infinity;
    for (let i = 0; i < n; ++i) {
        let g = nums[i];
        for (let j = i + 1; j < n; ++j) {
            g = gcd(g, nums[j]);
            if (g === 1) {
                res = Math.min(res, j - i);
                break;
            }
        }
    }
    return res === Infinity ? -1 : res + n - 1;
};

function gcd(a, b) {
    while (b) [a, b] = [b, a % b];
    return a;
}

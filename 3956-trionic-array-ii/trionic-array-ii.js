var maxSumTrionic = function(nums) {
  const n = nums.length;
  const NEG = -Infinity;

  let dp0 = nums[0];   
  let dp1 = NEG;       
  let dp2 = NEG;      
  let dp3 = NEG;       

  let ans = NEG;

  for (let i = 1; i < n; i++) {
    const x = nums[i];

    let ndp0 = x;
    let ndp1 = NEG, ndp2 = NEG, ndp3 = NEG;

    if (nums[i] > nums[i - 1]) {
      ndp0 = Math.max(dp0 + x, x);
      ndp1 = Math.max(dp1 + x, dp0 + x);
      ndp3 = Math.max(dp3 + x, dp2 + x);
    } else if (nums[i] < nums[i - 1]) {
      ndp0 = x;
      ndp2 = Math.max(dp2 + x, dp1 + x);
    } else {
      ndp0 = x;
    }

    dp0 = ndp0;
    dp1 = ndp1;
    dp2 = ndp2;
    dp3 = ndp3;

    if (dp3 > ans) ans = dp3;
  }

  return ans;
};

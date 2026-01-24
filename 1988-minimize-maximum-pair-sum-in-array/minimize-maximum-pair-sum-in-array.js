var minPairSum = function(nums) {
  nums.sort((a, b) => a - b);
  let l = 0, r = nums.length - 1;
  let ans = 0;

  while (l < r) {
    ans = Math.max(ans, nums[l] + nums[r]);
    l++;
    r--;
  }

  return ans;
};

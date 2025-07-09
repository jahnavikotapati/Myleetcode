function summaryRanges(nums) {
  const result = [];
  let i = 0;

  while (i < nums.length) {
    let start = nums[i];
    while (i + 1 < nums.length && nums[i + 1] === nums[i] + 1) {
      i++;
    }
    let end = nums[i];
    if (start === end) {
      result.push(start.toString());
    } else {
      result.push(`${start}->${end}`);
    }
    i++;
  }

  return result;
}

var smallestSubarrays = function(nums) {
    const n = nums.length;
    const last = Array(32).fill(-1); 
    const answer = Array(n).fill(1);
    for (let i = n - 1; i >= 0; i--) {
        for (let b = 0; b < 32; b++) {
            if ((nums[i] >> b) & 1) {
                last[b] = i;
            }
        }
        let maxReach = i;
        for (let b = 0; b < 32; b++) {
            if (last[b] !== -1) {
                maxReach = Math.max(maxReach, last[b]);
            }
        }
        answer[i] = maxReach - i + 1;
    }
    return answer;
};

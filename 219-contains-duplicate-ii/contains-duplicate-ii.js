function containsNearbyDuplicate(nums, k) {
    const map = {};

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];

        if (map[num] !== undefined && i - map[num] <= k) {
            return true;
        }

        map[num] = i; 
    }

    return false;
}

var minimumDistance = function(nums) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (!map.has(nums[i])) map.set(nums[i], []);
        map.get(nums[i]).push(i);
    }
    
    let res = Infinity;
    
    for (let indices of map.values()) {
        if (indices.length < 3) continue;
        for (let i = 0; i + 2 < indices.length; i++) {
            res = Math.min(res, 2 * (indices[i + 2] - indices[i]));
        }
    }
    
    return res === Infinity ? -1 : res;
};
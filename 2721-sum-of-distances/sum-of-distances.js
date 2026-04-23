var distance = function(nums) {
    const n = nums.length;
    const res = new Array(n).fill(0);
    
    // Step 1: group indices
    const map = new Map();
    for (let i = 0; i < n; i++) {
        if (!map.has(nums[i])) map.set(nums[i], []);
        map.get(nums[i]).push(i);
    }
    
    // Step 2: process each group
    for (let indices of map.values()) {
        let m = indices.length;
        
        // prefix sum
        let prefix = new Array(m).fill(0);
        prefix[0] = indices[0];
        for (let i = 1; i < m; i++) {
            prefix[i] = prefix[i - 1] + indices[i];
        }
        
        for (let k = 0; k < m; k++) {
            let i = indices[k];
            
            // left
            let leftSum = k > 0 ? prefix[k - 1] : 0;
            let leftCount = k;
            let left = i * leftCount - leftSum;
            
            // right
            let rightSum = prefix[m - 1] - prefix[k];
            let rightCount = m - k - 1;
            let right = rightSum - i * rightCount;
            
            res[i] = left + right;
        }
    }
    
    return res;
};
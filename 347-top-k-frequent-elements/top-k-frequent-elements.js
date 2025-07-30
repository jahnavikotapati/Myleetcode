var topKFrequent = function(nums, k) {
    const freqMap = new Map();
    for (let num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }
    const buckets = Array(nums.length + 1).fill().map(() => []);
    for (let [num, freq] of freqMap.entries()) {
        buckets[freq].push(num);
    }
    const result = [];
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        for (let num of buckets[i]) {
            result.push(num);
            if (result.length === k) break;
        }
    }
    return result;
};

var maxFrequencyElements = function(nums) {
    const freqMap = new Map();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }
    let maxFreq = 0;
    for (const freq of freqMap.values()) {
        maxFreq = Math.max(maxFreq, freq);
    }
    let result = 0;
    for (const freq of freqMap.values()) {
        if (freq === maxFreq) result += freq;
    }
    return result;
};
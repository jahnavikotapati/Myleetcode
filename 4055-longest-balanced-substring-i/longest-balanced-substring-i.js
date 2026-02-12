var longestBalanced = function(s) {
    const n = s.length;
    let maxLen = 0;

    for (let i = 0; i < n; i++) {
        const freq = new Array(26).fill(0);
        let distinct = 0;
        let maxFreq = 0;

        for (let j = i; j < n; j++) {
            const idx = s.charCodeAt(j) - 97;

            if (freq[idx] === 0) {
                distinct++;
            }

            freq[idx]++;
            maxFreq = Math.max(maxFreq, freq[idx]);

            const length = j - i + 1;

            // Check if balanced
            if (length === distinct * maxFreq) {
                maxLen = Math.max(maxLen, length);
            }
        }
    }

    return maxLen;
};

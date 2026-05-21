var longestCommonPrefix = function(arr1, arr2) {
    const prefixes = new Set();

    for (const num of arr1) {
        let str = num.toString();
        let prefix = "";
        for (const ch of str) {
            prefix += ch;
            prefixes.add(prefix);
        }
    }

    let maxLen = 0;

    for (const num of arr2) {
        let str = num.toString();
        let prefix = "";
        for (const ch of str) {
            prefix += ch;
            if (prefixes.has(prefix)) {
                maxLen = Math.max(maxLen, prefix.length);
            } else {
                break;
            }
        }
    }

    return maxLen;
};
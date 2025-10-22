var maxFrequency = function(nums, k, numOperations) {
    nums.sort((a,b)=>a-b);
    const n = nums.length;
    const freq = new Map();
    for (const x of nums) freq.set(x, (freq.get(x) || 0) + 1);
    function lowerBound(arr, target){
        let l = 0, r = arr.length;
        while(l < r){
            const m = (l + r) >> 1;
            if (arr[m] < target) l = m + 1; else r = m;
        }
        return l;
    }
    function upperBound(arr, target){
        let l = 0, r = arr.length;
        while(l < r){
            const m = (l + r) >> 1;
            if (arr[m] <= target) l = m + 1; else r = m;
        }
        return l;
    }
    let ans = 1;
    // candidates where x equals an existing number
    let i = 0;
    while (i < n) {
        const v = nums[i];
        const countV = freq.get(v);
        const l = lowerBound(nums, v - k);
        const r = upperBound(nums, v + k) - 1;
        const covering = r - l + 1;
        ans = Math.max(ans, Math.min(covering, countV + numOperations));
        i += countV;
    }
    // candidate where x may be any point (not necessarily an existing number)
    const starts = new Array(n);
    const ends = new Array(n);
    for (let j = 0; j < n; j++) {
        starts[j] = nums[j] - k;
        ends[j] = nums[j] + k;
    }
    starts.sort((a,b)=>a-b);
    ends.sort((a,b)=>a-b);
    let p = 0, q = 0, cur = 0, maxCover = 0;
    while (p < n) {
        if (starts[p] <= ends[q]) {
            cur++; if (cur > maxCover) maxCover = cur;
            p++;
        } else {
            cur--; q++;
        }
    }
    ans = Math.max(ans, Math.min(maxCover, numOperations));
    if (ans > n) ans = n;
    return ans;
};

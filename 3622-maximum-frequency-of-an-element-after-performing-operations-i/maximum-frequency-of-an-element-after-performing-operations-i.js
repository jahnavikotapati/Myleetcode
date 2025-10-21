var maxFrequency = function(nums, k, numOperations) {
    nums.sort((a,b)=>a-b);
    const n = nums.length;
    const freq = new Map();
    for (let x of nums) freq.set(x, (freq.get(x)||0)+1);
    const uniques = Array.from(new Set(nums));
    const lowerBound = (arr, target) => {
        let l = 0, r = arr.length;
        while (l < r) {
            let m = (l + r) >> 1;
            if (arr[m] < target) l = m + 1; else r = m;
        }
        return l;
    };
    const upperBound = (arr, target) => {
        let l = 0, r = arr.length;
        while (l < r) {
            let m = (l + r) >> 1;
            if (arr[m] <= target) l = m + 1; else r = m;
        }
        return l;
    };
    let ans = 0;
    for (let v of uniques) {
        const l = lowerBound(nums, v - k);
        const r = upperBound(nums, v + k) - 1;
        const countInRange = r >= l ? r - l + 1 : 0;
        const existing = freq.get(v) || 0;
        ans = Math.max(ans, Math.min(countInRange, existing + numOperations));
    }
    const events = [];
    for (let x of nums) {
        events.push([x - k, 1]);
        events.push([x + k, -1]);
    }
    events.sort((a,b)=>{
        if (a[0] !== b[0]) return a[0] - b[0];
        return b[1] - a[1];
    });
    let cur = 0, maxOverlap = 0;
    for (let [pos, t] of events) {
        cur += t;
        if (cur > maxOverlap) maxOverlap = cur;
    }
    ans = Math.max(ans, Math.min(maxOverlap, numOperations));
    return Math.max(ans, 1);
};

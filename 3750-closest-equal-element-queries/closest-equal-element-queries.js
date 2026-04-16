var solveQueries = function(nums, queries) {
    const n = nums.length;
    const pos = new Map();

    // store indices for each value
    for (let i = 0; i < n; i++) {
        if (!pos.has(nums[i])) pos.set(nums[i], []);
        pos.get(nums[i]).push(i);
    }

    const indexInList = new Map();

    // for each index, store its position inside its value's occurrence list
    for (const arr of pos.values()) {
        for (let i = 0; i < arr.length; i++) {
            indexInList.set(arr[i], i);
        }
    }

    const ans = [];

    for (const q of queries) {
        const arr = pos.get(nums[q]);

        if (arr.length === 1) {
            ans.push(-1);
            continue;
        }

        const k = indexInList.get(q);
        const prevIdx = arr[(k - 1 + arr.length) % arr.length];
        const nextIdx = arr[(k + 1) % arr.length];

        const d1 = Math.abs(q - prevIdx);
        const d2 = Math.abs(q - nextIdx);

        const dist1 = Math.min(d1, n - d1);
        const dist2 = Math.min(d2, n - d2);

        ans.push(Math.min(dist1, dist2));
    }

    return ans;
};
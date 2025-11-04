var findXSum = function(nums, k, x) {
    const n = nums.length;
    const res = [];
    const freq = new Map();
    const countMap = new Map();

    const add = (val) => {
        let f = freq.get(val) || 0;
        if (f > 0) {
            const s = countMap.get(f);
            s.delete(val);
            if (s.size === 0) countMap.delete(f);
        }
        f++;
        freq.set(val, f);
        if (!countMap.has(f)) countMap.set(f, new Set());
        countMap.get(f).add(val);
    };

    const remove = (val) => {
        let f = freq.get(val);
        const s = countMap.get(f);
        s.delete(val);
        if (s.size === 0) countMap.delete(f);
        f--;
        if (f === 0) {
            freq.delete(val);
        } else {
            freq.set(val, f);
            if (!countMap.has(f)) countMap.set(f, new Set());
            countMap.get(f).add(val);
        }
    };

    for (let i = 0; i < k; i++) add(nums[i]);

    const calcSum = () => {
        let remaining = x, sum = 0;
        const keys = Array.from(countMap.keys()).sort((a, b) => b - a);
        for (let f of keys) {
            const vals = Array.from(countMap.get(f)).sort((a, b) => b - a);
            for (let v of vals) {
                sum += freq.get(v) * v;
                remaining--;
                if (remaining === 0) return sum;
            }
        }
        return sum;
    };

    res.push(calcSum());

    for (let i = k; i < n; i++) {
        remove(nums[i - k]);
        add(nums[i]);
        res.push(calcSum());
    }

    return res;
};

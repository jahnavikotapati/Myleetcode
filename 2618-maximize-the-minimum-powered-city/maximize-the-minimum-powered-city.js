var maxPower = function(stations, r, k) {
    const n = stations.length;
    const prefix = Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] + stations[i];
    const power = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        let left = Math.max(0, i - r), right = Math.min(n - 1, i + r);
        power[i] = prefix[right + 1] - prefix[left];
    }

    let low = Math.min(...power), high = Math.max(...power) + k, ans = 0;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (can(mid)) {
            ans = mid;
            low = mid + 1;
        } else high = mid - 1;
    }
    return ans;

    function can(target) {
        const added = Array(n).fill(0);
        let extra = 0, sum = 0;
        for (let i = 0; i < n; i++) {
            if (i - r - 1 >= 0) sum -= added[i - r - 1];
            let curr = power[i] + sum;
            if (curr < target) {
                let need = target - curr;
                if (need > k - extra) return false;
                extra += need;
                added[Math.min(n - 1, i + r)] += need;
                sum += need;
            }
        }
        return true;
    }
};

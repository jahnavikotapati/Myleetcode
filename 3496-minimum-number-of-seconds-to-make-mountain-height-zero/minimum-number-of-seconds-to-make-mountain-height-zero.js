var minNumberOfSeconds = function(mountainHeight, workerTimes) {
    const can = (time) => {
        let total = 0;

        for (let w of workerTimes) {
            let left = 0, right = mountainHeight;

            while (left <= right) {
                let mid = Math.floor((left + right) / 2);
                let cost = w * mid * (mid + 1) / 2;

                if (cost <= time) left = mid + 1;
                else right = mid - 1;
            }

            total += right;
            if (total >= mountainHeight) return true;
        }

        return false;
    };

    let left = 0;
    let right = 1e18;
    let ans = right;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (can(mid)) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return ans;
};
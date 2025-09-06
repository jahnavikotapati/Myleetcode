var minOperations = function(queries) {
    let total = 0;

    for (let [l, r] of queries) {
        let ops = 0;
        let step = 1;
        let start = 1, end = 3;

        while (start <= r) {
            let left = Math.max(l, start);
            let right = Math.min(r, end);
            if (left <= right) {
                let count = right - left + 1;
                ops += count * step;
            }
            step++;
            start *= 4;
            end = end * 4 + 3; 
        }

        total += Math.ceil(ops / 2);
    }

    return total;
};

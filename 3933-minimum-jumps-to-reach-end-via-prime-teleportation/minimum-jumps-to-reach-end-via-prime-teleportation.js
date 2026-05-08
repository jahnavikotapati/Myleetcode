var minJumps = function(nums) {
    let n = nums.length;
    if (n === 1) return 0;

    let maxVal = Math.max(...nums);
    let spf = Array(maxVal + 1).fill(0);

    for (let i = 2; i <= maxVal; i++) {
        if (spf[i] === 0) {
            for (let j = i; j <= maxVal; j += i) {
                if (spf[j] === 0) spf[j] = i;
            }
        }
    }

    let multiples = new Map();

    for (let i = 0; i < n; i++) {
        let x = nums[i];
        let seen = new Set();

        while (x > 1) {
            let p = spf[x];

            if (!seen.has(p)) {
                seen.add(p);

                if (!multiples.has(p)) multiples.set(p, []);
                multiples.get(p).push(i);
            }

            while (x % p === 0) x /= p;
        }
    }

    let q = [0];
    let visited = Array(n).fill(false);
    visited[0] = true;

    let usedPrime = new Set();
    let steps = 0;

    while (q.length) {
        let size = q.length;

        for (let s = 0; s < size; s++) {
            let i = q.shift();

            if (i === n - 1) return steps;

            if (i - 1 >= 0 && !visited[i - 1]) {
                visited[i - 1] = true;
                q.push(i - 1);
            }

            if (i + 1 < n && !visited[i + 1]) {
                visited[i + 1] = true;
                q.push(i + 1);
            }

            let val = nums[i];

            if (val >= 2 && spf[val] === val && !usedPrime.has(val)) {
                usedPrime.add(val);

                if (multiples.has(val)) {
                    for (let j of multiples.get(val)) {
                        if (!visited[j]) {
                            visited[j] = true;
                            q.push(j);
                        }
                    }
                }
            }
        }

        steps++;
    }

    return -1;
};
var maxWalls = function(robots, distance, walls) {
    const n = robots.length;
    const m = walls.length;

    const arr = robots.map((p, i) => [p, distance[i]]);
    arr.sort((a, b) => a[0] - b[0]);

    const pos = new Array(n);
    const dist = new Array(n);
    for (let i = 0; i < n; i++) {
        pos[i] = arr[i][0];
        dist[i] = arr[i][1];
    }

    walls.sort((a, b) => a - b);

    function lowerBound(target) {
        let l = 0, r = walls.length;
        while (l < r) {
            const mid = (l + r) >> 1;
            if (walls[mid] < target) l = mid + 1;
            else r = mid;
        }
        return l;
    }

    function upperBound(target) {
        let l = 0, r = walls.length;
        while (l < r) {
            const mid = (l + r) >> 1;
            if (walls[mid] <= target) l = mid + 1;
            else r = mid;
        }
        return l;
    }

    function countRange(L, R) {
        if (L > R) return 0;
        return upperBound(R) - lowerBound(L);
    }

    let base = 0;
    for (let i = 0; i < n; i++) {
        const idx = lowerBound(pos[i]);
        if (idx < m && walls[idx] === pos[i]) base++;
    }

    const leftExtra = countRange(pos[0] - dist[0], pos[0] - 1);
    const rightExtra = countRange(pos[n - 1] + 1, pos[n - 1] + dist[n - 1]);

    const A = new Array(n - 1).fill(0);
    const B = new Array(n - 1).fill(0);
    const U = new Array(n - 1).fill(0);

    for (let i = 0; i < n - 1; i++) {
        const gapL = pos[i] + 1;
        const gapR = pos[i + 1] - 1;

        if (gapL > gapR) continue;

        const r1L = gapL;
        const r1R = Math.min(pos[i] + dist[i], gapR);

        const r2L = Math.max(pos[i + 1] - dist[i + 1], gapL);
        const r2R = gapR;

        A[i] = countRange(r1L, r1R);
        B[i] = countRange(r2L, r2R);

        let inter = 0;
        const interL = Math.max(r1L, r2L);
        const interR = Math.min(r1R, r2R);
        if (interL <= interR) inter = countRange(interL, interR);

        U[i] = A[i] + B[i] - inter;
    }

    let dpL = base + leftExtra;
    let dpR = base;

    for (let i = 1; i < n; i++) {
        const g = i - 1;

        const newL = Math.max(
            dpL + B[g],
            dpR + U[g]
        );

        const newR = Math.max(
            dpL,
            dpR + A[g]
        );

        dpL = newL;
        dpR = newR;
    }

    return Math.max(dpL, dpR + rightExtra);
};
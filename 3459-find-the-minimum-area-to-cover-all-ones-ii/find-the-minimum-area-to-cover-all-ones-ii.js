/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumSum = function(grid) {
    const m = grid.length, n = grid[0].length;

    // ----- prefix sums for O(1) 1-count in any subrectangle -----
    const pref = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            pref[i+1][j+1] = grid[i][j] + pref[i][j+1] + pref[i+1][j] - pref[i][j];
        }
    }
    function ones(r1, c1, r2, c2) {
        if (r1 > r2 || c1 > c2) return 0;
        return pref[r2+1][c2+1] - pref[r1][c2+1] - pref[r2+1][c1] + pref[r1][c1];
    }

    // ----- cost1: exactly 1 rectangle in region -----
    // If region has no 1s, we still must place a non-zero-area rectangle → area = 1 (best is 1x1).
    const memo1 = new Map();
    function key(r1,c1,r2,c2){ return r1+'#'+c1+'#'+r2+'#'+c2; }

    function cost1(r1, c1, r2, c2) {
        const k = key(r1,c1,r2,c2);
        if (memo1.has(k)) return memo1.get(k);

        const cnt = ones(r1,c1,r2,c2);
        if (cnt === 0) { memo1.set(k, 1); return 1; }

        let minR = m, maxR = -1, minC = n, maxC = -1;
        for (let i = r1; i <= r2; i++) {
            for (let j = c1; j <= c2; j++) {
                if (grid[i][j] === 1) {
                    if (i < minR) minR = i;
                    if (i > maxR) maxR = i;
                    if (j < minC) minC = j;
                    if (j > maxC) maxC = j;
                }
            }
        }
        const area = (maxR - minR + 1) * (maxC - minC + 1);
        memo1.set(k, area);
        return area;
    }

    // ----- cost2: exactly 2 rectangles in region -----
    // Any two non-overlapping axis-aligned rectangles can be separated by a horizontal or vertical line.
    // Try all splits; each side pays cost1 (exactly one rectangle).
    const memo2 = new Map();
    function cost2(r1, c1, r2, c2) {
        const k = key(r1,c1,r2,c2);
        if (memo2.has(k)) return memo2.get(k);

        const cnt = ones(r1,c1,r2,c2);
        if (cnt === 0) { memo2.set(k, 2); return 2; } // two 1x1 dummies

        let best = Infinity;

        // Vertical splits into [c1..k] and [k+1..c2]
        for (let kcol = c1; kcol < c2; kcol++) {
            const left  = cost1(r1, c1, r2, kcol);
            const right = cost1(r1, kcol + 1, r2, c2);
            const sum = left + right;
            if (sum < best) best = sum;
        }

        // Horizontal splits into [r1..k] and [k+1..r2]
        for (let krow = r1; krow < r2; krow++) {
            const top = cost1(r1, c1, krow, c2);
            const bot = cost1(krow + 1, c1, r2, c2);
            const sum = top + bot;
            if (sum < best) best = sum;
        }

        memo2.set(k, best);
        return best;
    }

    let ans = Infinity;

    // ----- 3 vertical strips -----
    for (let cA = 0; cA <= n - 3; cA++) {
        for (let cB = cA + 1; cB <= n - 2; cB++) {
            const a = cost1(0, 0,     m - 1, cA);
            const b = cost1(0, cA+1,  m - 1, cB);
            const c = cost1(0, cB+1,  m - 1, n - 1);
            const sum = a + b + c;
            if (sum < ans) ans = sum;
        }
    }

    // ----- 3 horizontal strips -----
    for (let rA = 0; rA <= m - 3; rA++) {
        for (let rB = rA + 1; rB <= m - 2; rB++) {
            const a = cost1(0,     0, rA,     n - 1);
            const b = cost1(rA+1,  0, rB,     n - 1);
            const c = cost1(rB+1,  0, m - 1,  n - 1);
            const sum = a + b + c;
            if (sum < ans) ans = sum;
        }
    }

    // ----- 1+2 via a single horizontal cut (both assignments) -----
    for (let r = 0; r < m - 1; r++) {
        // top gets 2, bottom gets 1
        {
            const top2 = cost2(0, 0, r, n - 1);
            const bot1 = cost1(r + 1, 0, m - 1, n - 1);
            const sum = top2 + bot1;
            if (sum < ans) ans = sum;
        }
        // top gets 1, bottom gets 2
        {
            const top1 = cost1(0, 0, r, n - 1);
            const bot2 = cost2(r + 1, 0, m - 1, n - 1);
            const sum = top1 + bot2;
            if (sum < ans) ans = sum;
        }
    }

    // ----- 1+2 via a single vertical cut (both assignments) -----
    for (let c = 0; c < n - 1; c++) {
        // left gets 2, right gets 1
        {
            const left2  = cost2(0, 0, m - 1, c);
            const right1 = cost1(0, c + 1, m - 1, n - 1);
            const sum = left2 + right1;
            if (sum < ans) ans = sum;
        }
        // left gets 1, right gets 2
        {
            const left1  = cost1(0, 0, m - 1, c);
            const right2 = cost2(0, c + 1, m - 1, n - 1);
            const sum = left1 + right2;
            if (sum < ans) ans = sum;
        }
    }

    // ans must be finite per problem guarantees (≥3 ones), but keep guard:
    return ans === Infinity ? 0 : ans;
};

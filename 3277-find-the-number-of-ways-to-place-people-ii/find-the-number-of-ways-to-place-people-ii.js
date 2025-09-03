var numberOfPairs = function(points) {
    const n = points.length;
    const pts = points.slice().sort((a,b)=> a[0] - b[0] || a[1] - b[1]);
    const xsFirst = new Map();
    const xsLast = new Map();
    for (let i = 0; i < n; i++) {
        const x = pts[i][0];
        if (!xsFirst.has(x)) xsFirst.set(x, i);
        xsLast.set(x, i);
    }
    const ysArr = Array.from(new Set(pts.map(p => p[1]))).sort((a,b) => a - b);
    const m = ysArr.length;
    const yMap = new Map();
    for (let i = 0; i < m; i++) yMap.set(ysArr[i], i);
    const pref = new Array(n + 1);
    for (let i = 0; i <= n; i++) pref[i] = new Array(m + 1).fill(0);
    for (let i = 0; i < n; i++) {
        const yi = yMap.get(pts[i][1]);
        for (let j = 0; j < m; j++) {
            pref[i+1][j+1] = pref[i][j+1] + pref[i+1][j] - pref[i][j] + (j === yi ? 1 : 0);
        }
    }
    function getCount(xL, xR, yL, yR) {
        return pref[xR+1][yR+1] - pref[xL][yR+1] - pref[xR+1][yL] + pref[xL][yL];
    }
    let ans = 0;
    for (let i = 0; i < n; i++) {
        const [ax, ay] = pts[i];
        for (let j = 0; j < n; j++) {
            if (i === j) continue;
            const [bx, by] = pts[j];
            if (ax <= bx && ay >= by) {
                const xL = xsFirst.get(ax);
                const xR = xsLast.get(bx);
                const yL = yMap.get(by);
                const yR = yMap.get(ay);
                if (getCount(xL, xR, yL, yR) === 2) ans++;
            }
        }
    }
    return ans;
};

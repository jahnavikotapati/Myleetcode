var largestSquareArea = function(bottomLeft, topRight) {
    const n = bottomLeft.length;
    let ans = 0;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            let x1 = Math.max(bottomLeft[i][0], bottomLeft[j][0]);
            let y1 = Math.max(bottomLeft[i][1], bottomLeft[j][1]);
            let x2 = Math.min(topRight[i][0], topRight[j][0]);
            let y2 = Math.min(topRight[i][1], topRight[j][1]);

            if (x2 > x1 && y2 > y1) {
                let side = Math.min(x2 - x1, y2 - y1);
                ans = Math.max(ans, side * side);
            }
        }
    }

    return ans;
};

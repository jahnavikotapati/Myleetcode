var intersectionSizeTwo = function(intervals) {
    intervals.sort((a, b) => a[1] - b[1] || b[0] - a[0]);
    let a = -1, b = -1, ans = 0;

    for (let [s, e] of intervals) {
        if (s > b) {
            ans += 2;
            a = e - 1;
            b = e;
        } else if (s > a) {
            ans += 1;
            a = b;
            b = e;
        }
    }
    return ans;
};

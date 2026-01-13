var separateSquares = function(squares) {
    let total = 0;
    let low = Infinity, high = -Infinity;

    for (let [x, y, l] of squares) {
        total += l * l;
        low = Math.min(low, y);
        high = Math.max(high, y + l);
    }

    const areaBelow = yLine => {
        let area = 0;
        for (let [x, y, l] of squares) {
            if (yLine <= y) continue;
            let h = Math.min(l, yLine - y);
            if (h > 0) area += h * l;
        }
        return area;
    };

    let left = low, right = high;
    for (let i = 0; i < 60; i++) {
        let mid = (left + right) / 2;
        if (areaBelow(mid) * 2 < total) left = mid;
        else right = mid;
    }

    return left;
};

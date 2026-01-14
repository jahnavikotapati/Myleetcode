var separateSquares = function(squares) {
    let events = [];
    let ys = new Set();

    for (let [x, y, l] of squares) {
        events.push([y, x, x + l, 1]);
        events.push([y + l, x, x + l, -1]);
        ys.add(y);
        ys.add(y + l);
    }

    ys = Array.from(ys).sort((a, b) => a - b);

    events.sort((a, b) => a[0] - b[0]);

    const mergeLen = intervals => {
        if (!intervals.length) return 0;
        intervals.sort((a, b) => a[0] - b[0]);
        let res = 0, [s, e] = intervals[0];
        for (let i = 1; i < intervals.length; i++) {
            let [ns, ne] = intervals[i];
            if (ns > e) {
                res += e - s;
                s = ns;
                e = ne;
            } else {
                e = Math.max(e, ne);
            }
        }
        return res + (e - s);
    };

    let active = [];
    let areaSlices = [];
    let idx = 0;
    let totalArea = 0;

    for (let i = 0; i < ys.length - 1; i++) {
        let y = ys[i], ny = ys[i + 1];
        while (idx < events.length && events[idx][0] === y) {
            let [, x1, x2, type] = events[idx++];
            if (type === 1) active.push([x1, x2]);
            else {
                for (let j = 0; j < active.length; j++) {
                    if (active[j][0] === x1 && active[j][1] === x2) {
                        active.splice(j, 1);
                        break;
                    }
                }
            }
        }
        let width = mergeLen(active);
        let area = width * (ny - y);
        if (area > 0) {
            areaSlices.push([y, ny, width, area]);
            totalArea += area;
        }
    }

    let half = totalArea / 2;
    let acc = 0;

    for (let [y, ny, width, area] of areaSlices) {
        if (acc + area >= half) {
            let dy = (half - acc) / width;
            return y + dy;
        }
        acc += area;
    }

    return ys[0];
};

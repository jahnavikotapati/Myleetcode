var maximizeSquareHoleArea = function(n, m, hBars, vBars) {
    const maxGap = bars => {
        bars.sort((a, b) => a - b);
        let best = 1, cur = 1;
        for (let i = 1; i < bars.length; i++) {
            if (bars[i] === bars[i - 1] + 1) cur++;
            else cur = 1;
            best = Math.max(best, cur);
        }
        return best + 1;
    };

    let h = maxGap(hBars);
    let v = maxGap(vBars);
    let side = Math.min(h, v);
    return side * side;
};

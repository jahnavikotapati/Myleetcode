var closestTarget = function(words, target, startIndex) {
    const n = words.length;
    let minDist = Infinity;

    for (let i = 0; i < n; i++) {
        if (words[i] === target) {
            let d = Math.abs(i - startIndex);
            let dist = Math.min(d, n - d);
            minDist = Math.min(minDist, dist);
        }
    }

    return minDist === Infinity ? -1 : minDist;
};
var minimumDistance = function(word) {
    const getPos = c => [Math.floor((c.charCodeAt(0) - 65) / 6), (c.charCodeAt(0) - 65) % 6];
    const dist = (a, b) => {
        if (a === null) return 0;
        const [x1, y1] = getPos(a);
        const [x2, y2] = getPos(b);
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    };

    const n = word.length;
    let dp = Array(26).fill(0);
    let total = 0;

    for (let i = 1; i < n; i++) {
        let next = Array(26).fill(0);
        const prev = word[i - 1];
        const curr = word[i];
        total += dist(prev, curr);

        for (let j = 0; j < 26; j++) {
            const c = String.fromCharCode(65 + j);
            next[j] = Math.max(next[j], dp[j]);
            const gain = dp[j] + dist(prev, curr) - dist(c, curr);
            next[prev.charCodeAt(0) - 65] = Math.max(next[prev.charCodeAt(0) - 65], gain);
        }
        dp = next;
    }

    return total - Math.max(...dp);
};
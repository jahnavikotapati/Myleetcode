function findTheString(lcp) {
    const n = lcp.length;
    for (let i = 0; i < n; i++) {
        if (lcp[i][i] !== n - i) return "";
    }

    const parent = Array.from({ length: n }, (_, i) => i);
    const rank = Array(n).fill(0);

    const find = (x) => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };

    const union = (a, b) => {
        let pa = find(a), pb = find(b);
        if (pa === pb) return;
        if (rank[pa] < rank[pb]) {
            parent[pa] = pb;
        } else if (rank[pa] > rank[pb]) {
            parent[pb] = pa;
        } else {
            parent[pb] = pa;
            rank[pa]++;
        }
    };

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (lcp[i][j] > 0) union(i, j);
        }
    }

    const groupChar = new Map();
    const chars = Array(n);
    let nextCode = 97;

    for (let i = 0; i < n; i++) {
        const root = find(i);
        if (!groupChar.has(root)) {
            if (nextCode > 122) return "";
            groupChar.set(root, String.fromCharCode(nextCode++));
        }
        chars[i] = groupChar.get(root);
    }

    const dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

    for (let i = n - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (chars[i] === chars[j]) dp[i][j] = 1 + dp[i + 1][j + 1];
            if (dp[i][j] !== lcp[i][j]) return "";
        }
    }

    return chars.join("");
}
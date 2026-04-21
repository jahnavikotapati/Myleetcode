var minimumHammingDistance = function(source, target, allowedSwaps) {
    const n = source.length;

    // Union-Find
    let parent = Array.from({ length: n }, (_, i) => i);

    function find(x) {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]); // path compression
        }
        return parent[x];
    }

    function union(a, b) {
        let pa = find(a);
        let pb = find(b);
        if (pa !== pb) {
            parent[pa] = pb;
        }
    }

    // Step 1: Build components
    for (let [a, b] of allowedSwaps) {
        union(a, b);
    }

    // Step 2: Group indices by component
    let groups = new Map();
    for (let i = 0; i < n; i++) {
        let root = find(i);
        if (!groups.has(root)) {
            groups.set(root, []);
        }
        groups.get(root).push(i);
    }

    let hamming = 0;

    // Step 3: Process each group
    for (let indices of groups.values()) {
        let count = new Map();

        // Count source frequencies
        for (let i of indices) {
            count.set(source[i], (count.get(source[i]) || 0) + 1);
        }

        // Match with target
        for (let i of indices) {
            if (count.get(target[i]) > 0) {
                count.set(target[i], count.get(target[i]) - 1);
            } else {
                hamming++;
            }
        }
    }

    return hamming;
};
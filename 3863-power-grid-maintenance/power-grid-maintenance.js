var processQueries = function(c, connections, queries) {
    const parent = Array.from({ length: c + 1 }, (_, i) => i);
    const rank = Array(c + 1).fill(0);

    function find(x) {
        if (parent[x] !== x) parent[x] = find(parent[x]);
        return parent[x];
    }

    function union(x, y) {
        let a = find(x), b = find(y);
        if (a === b) return;
        if (rank[a] > rank[b]) parent[b] = a;
        else if (rank[a] < rank[b]) parent[a] = b;
        else { parent[b] = a; rank[a]++; }
    }

    for (let [u, v] of connections) union(u, v);

    const grids = new Map();
    const head = new Map();
    const online = Array(c + 1).fill(true);

    function bsearchInsert(arr, val) {
        let l = 0, r = arr.length;
        while (l < r) {
            let m = (l + r) >> 1;
            if (arr[m] < val) l = m + 1;
            else r = m;
        }
        return l;
    }

    for (let i = 1; i <= c; i++) {
        const r = find(i);
        if (!grids.has(r)) { grids.set(r, []); head.set(r, 0); }
        const arr = grids.get(r);
        arr.splice(bsearchInsert(arr, i), 0, i);
    }

    const res = [];
    for (let [type, x] of queries) {
        if (type === 2) {
            online[x] = false;
            continue;
        }
        if (online[x]) { res.push(x); continue; }
        const r = find(x);
        const arr = grids.get(r) || [];
        let idx = head.get(r) || 0;
        while (idx < arr.length && !online[arr[idx]]) idx++;
        head.set(r, idx);
        if (idx < arr.length) res.push(arr[idx]);
        else res.push(-1);
    }

    return res;
};

function minimumScore(nums, edges) {
    const n = nums.length;
    const graph = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    const inTime = Array(n), outTime = Array(n), xor = Array(n);
    let time = 0;

    
    function dfs(u, parent) {
        inTime[u] = time++;
        xor[u] = nums[u];
        for (const v of graph[u]) {
            if (v === parent) continue;
            dfs(v, u);
            xor[u] ^= xor[v];
        }
        outTime[u] = time++;
    }

    dfs(0, -1);

    function isDescendant(u, v) {
        return inTime[v] >= inTime[u] && outTime[v] <= outTime[u];
    }

    let res = Infinity;
    const edgesList = [];

    
    function getEdges(u, parent) {
        for (const v of graph[u]) {
            if (v === parent) continue;
            edgesList.push([u, v]); 
            getEdges(v, u);
        }
    }

    getEdges(0, -1);

   
    for (let i = 0; i < edgesList.length; i++) {
        for (let j = i + 1; j < edgesList.length; j++) {
            const [a, b] = edgesList[i]; // edge1
            const [c, d] = edgesList[j]; // edge2

            let x1 = xor[b], x2 = xor[d], x3;

            if (isDescendant(b, d)) {
                // d in subtree of b
                x1 = xor[b] ^ xor[d];
                x2 = xor[d];
                x3 = xor[0] ^ xor[b];
            } else if (isDescendant(d, b)) {
                // b in subtree of d
                x1 = xor[d] ^ xor[b];
                x2 = xor[b];
                x3 = xor[0] ^ xor[d];
            } else {
                x1 = xor[b];
                x2 = xor[d];
                x3 = xor[0] ^ x1 ^ x2;
            }

            const maxX = Math.max(x1, x2, x3);
            const minX = Math.min(x1, x2, x3);
            res = Math.min(res, maxX - minX);
        }
    }

    return res;
}

var minJumps = function(arr) {
    const n = arr.length;
    if (n === 1) return 0;

    const map = new Map();

    for (let i = 0; i < n; i++) {
        if (!map.has(arr[i])) {
            map.set(arr[i], []);
        }
        map.get(arr[i]).push(i);
    }

    const queue = [0];
    const visited = new Array(n).fill(false);
    visited[0] = true;
    let steps = 0;

    while (queue.length) {
        let size = queue.length;

        while (size--) {
            const i = queue.shift();

            if (i === n - 1) return steps;

            const neighbors = [];

            if (i - 1 >= 0) neighbors.push(i - 1);
            if (i + 1 < n) neighbors.push(i + 1);

            if (map.has(arr[i])) {
                neighbors.push(...map.get(arr[i]));
                map.delete(arr[i]);
            }

            for (const next of neighbors) {
                if (!visited[next]) {
                    visited[next] = true;
                    queue.push(next);
                }
            }
        }

        steps++;
    }

    return -1;
};
var canReach = function(arr, start) {
    const queue = [start];
    const visited = new Array(arr.length).fill(false);
    visited[start] = true;

    while (queue.length) {
        const i = queue.shift();

        if (arr[i] === 0) return true;

        const next1 = i + arr[i];
        const next2 = i - arr[i];

        if (next1 < arr.length && !visited[next1]) {
            visited[next1] = true;
            queue.push(next1);
        }

        if (next2 >= 0 && !visited[next2]) {
            visited[next2] = true;
            queue.push(next2);
        }
    }

    return false;
};
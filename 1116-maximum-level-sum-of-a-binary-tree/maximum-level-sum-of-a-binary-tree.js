var maxLevelSum = function(root) {
    let queue = [root];
    let level = 1, bestLevel = 1;
    let bestSum = -Infinity;

    while (queue.length) {
        let size = queue.length;
        let sum = 0;

        for (let i = 0; i < size; i++) {
            let node = queue.shift();
            sum += node.val;
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        if (sum > bestSum) {
            bestSum = sum;
            bestLevel = level;
        }
        level++;
    }

    return bestLevel;
};

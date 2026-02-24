var sumRootToLeaf = function(root) {
    let total = 0;

    function dfs(node, current) {
        if (!node) return;
        current = (current << 1) | node.val;
        if (!node.left && !node.right) {
            total += current;
            return;
        }

        dfs(node.left, current);
        dfs(node.right, current);
    }

    dfs(root, 0);
    return total;
};
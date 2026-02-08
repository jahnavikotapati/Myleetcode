var isBalanced = function(root) {
    function dfs(node) {
        if (!node) return 0;

        const leftHeight = dfs(node.left);
        if (leftHeight === -1) return -1;

        const rightHeight = dfs(node.right);
        if (rightHeight === -1) return -1;

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1;
        }

        return Math.max(leftHeight, rightHeight) + 1;
    }

    return dfs(root) !== -1;
};

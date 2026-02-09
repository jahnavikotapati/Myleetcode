var balanceBST = function(root) {
    const values = [];

    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        values.push(node.val);
        inorder(node.right);
    }

    function build(left, right) {
        if (left > right) return null;

        const mid = Math.floor((left + right) / 2);
        const node = new TreeNode(values[mid]);

        node.left = build(left, mid - 1);
        node.right = build(mid + 1, right);

        return node;
    }

    inorder(root);
    return build(0, values.length - 1);
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var subtreeWithAllDeepest = function(root) {
    const dfs = node => {
        if (!node) return [0, null];
        let [ld, ln] = dfs(node.left);
        let [rd, rn] = dfs(node.right);
        if (ld > rd) return [ld + 1, ln];
        if (rd > ld) return [rd + 1, rn];
        return [ld + 1, node];
    };
    return dfs(root)[1];
};

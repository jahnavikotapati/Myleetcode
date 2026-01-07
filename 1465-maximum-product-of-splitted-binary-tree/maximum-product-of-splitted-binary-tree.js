var maxProduct = function(root) {
    const MOD = 1000000007;
    let totalSum = 0;
    let maxProd = 0;

    const sumTree = node => {
        if (!node) return 0;
        return node.val + sumTree(node.left) + sumTree(node.right);
    };

    totalSum = sumTree(root);

    const dfs = node => {
        if (!node) return 0;
        let left = dfs(node.left);
        let right = dfs(node.right);
        let subSum = node.val + left + right;
        let prod = subSum * (totalSum - subSum);
        if (prod > maxProd) maxProd = prod;
        return subSum;
    };

    dfs(root);
    return maxProd % MOD;
};

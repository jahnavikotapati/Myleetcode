class Solution {
    static class Node {
        int prod;
        int[] pref;

        Node(int k) {
            pref = new int[k];
        }
    }

    int n, k;
    Node[] tree;

    Node merge(Node left, Node right) {
        Node res = new Node(k);

        // Product of the whole segment
        res.prod = (left.prod * right.prod) % k;

        // Prefixes completely inside the left segment
        for (int r = 0; r < k; r++) {
            res.pref[r] += left.pref[r];
        }

        // Prefixes that use the entire left segment
        // and then some prefix of the right segment
        for (int r = 0; r < k; r++) {
            if (right.pref[r] == 0) continue;

            int newRemainder = (left.prod * r) % k;
            res.pref[newRemainder] += right.pref[r];
        }

        return res;
    }

    void build(int node, int l, int r, int[] nums) {
        if (l == r) {
            int val = nums[l] % k;

            tree[node].prod = val;
            tree[node].pref[val] = 1;
            return;
        }

        int mid = l + (r - l) / 2;

        build(node * 2, l, mid, nums);
        build(node * 2 + 1, mid + 1, r, nums);

        tree[node] = merge(tree[node * 2], tree[node * 2 + 1]);
    }

    void update(int node, int l, int r, int index, int value) {
        if (l == r) {
            tree[node] = new Node(k);

            int val = value % k;

            tree[node].prod = val;
            tree[node].pref[val] = 1;
            return;
        }

        int mid = l + (r - l) / 2;

        if (index <= mid) {
            update(node * 2, l, mid, index, value);
        } else {
            update(node * 2 + 1, mid + 1, r, index, value);
        }

        tree[node] = merge(tree[node * 2], tree[node * 2 + 1]);
    }

    Node query(int node, int l, int r, int ql, int qr) {
        if (ql <= l && r <= qr) {
            return tree[node];
        }

        int mid = l + (r - l) / 2;

        if (qr <= mid) {
            return query(node * 2, l, mid, ql, qr);
        }

        if (ql > mid) {
            return query(node * 2 + 1, mid + 1, r, ql, qr);
        }

        Node left = query(node * 2, l, mid, ql, qr);
        Node right = query(node * 2 + 1, mid + 1, r, ql, qr);

        return merge(left, right);
    }

    public int[] resultArray(int[] nums, int k, int[][] queries) {
        this.n = nums.length;
        this.k = k;

        tree = new Node[4 * n];

        for (int i = 0; i < tree.length; i++) {
            tree[i] = new Node(k);
        }

        build(1, 0, n - 1, nums);

        int[] ans = new int[queries.length];

        for (int i = 0; i < queries.length; i++) {
            int index = queries[i][0];
            int value = queries[i][1];
            int start = queries[i][2];
            int x = queries[i][3];

            // Persistent update
            update(1, 0, n - 1, index, value);

            // We need prefixes of nums[start ... n-1]
            Node res = query(1, 0, n - 1, start, n - 1);

            ans[i] = res.pref[x];
        }

        return ans;
    }
}
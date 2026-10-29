
import java.util.*;

class Solution {
    private List<Integer>[] graph;
    private int[] parent, depth, size, heavy;
    private int[] head, pos;
    private char[] s;
    private int timer;
    private SegmentTree seg;

    public List<Boolean> palindromePath(int n, int[][] edges,
                                        String s, String[] queries) {
        this.s = s.toCharArray();

        graph = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            graph[i] = new ArrayList<>();
        }

        for (int[] e : edges) {
            graph[e[0]].add(e[1]);
            graph[e[1]].add(e[0]);
        }

        parent = new int[n];
        depth = new int[n];
        size = new int[n];
        heavy = new int[n];
        head = new int[n];
        pos = new int[n];

        Arrays.fill(parent, -1);
        Arrays.fill(heavy, -1);

        // Build parent, depth, and traversal order iteratively.
        int[] order = new int[n];
        int[] stack = new int[n];
        int top = 0, count = 0;

        stack[top++] = 0;
        parent[0] = 0;

        while (top > 0) {
            int u = stack[--top];
            order[count++] = u;

            for (int v : graph[u]) {
                if (v == parent[u]) {
                    continue;
                }

                parent[v] = u;
                depth[v] = depth[u] + 1;
                stack[top++] = v;
            }
        }

        // Calculate subtree sizes and heavy children.
        for (int i = n - 1; i >= 0; i--) {
            int u = order[i];
            size[u] = 1;
            int maxSize = 0;

            for (int v : graph[u]) {
                if (parent[v] == u) {
                    size[u] += size[v];

                    if (size[v] > maxSize) {
                        maxSize = size[v];
                        heavy[u] = v;
                    }
                }
            }
        }

        // Assign heavy-chain heads and positions iteratively.
        int[] chainNode = new int[n];
        int[] chainHead = new int[n];
        int chains = 0;

        chainNode[chains] = 0;
        chainHead[chains++] = 0;
        timer = 0;

        while (chains > 0) {
            chains--;
            int u = chainNode[chains];
            int h = chainHead[chains];

            while (u != -1) {
                head[u] = h;
                pos[u] = timer++;

                for (int v : graph[u]) {
                    if (parent[v] == u && v != heavy[u]) {
                        chainNode[chains] = v;
                        chainHead[chains++] = v;
                    }
                }

                u = heavy[u];
            }
        }

        // Build segment tree with character masks.
        int[] values = new int[n];
        for (int i = 0; i < n; i++) {
            values[pos[i]] = 1 << (this.s[i] - 'a');
        }

        seg = new SegmentTree(values);

        List<Boolean> answer = new ArrayList<>();

        for (String q : queries) {
            String[] parts = q.split(" ");

            if (parts[0].equals("update")) {
                int u = Integer.parseInt(parts[1]);
                char c = parts[2].charAt(0);

                this.s[u] = c;
                seg.update(pos[u], 1 << (c - 'a'));
            } else {
                int u = Integer.parseInt(parts[1]);
                int v = Integer.parseInt(parts[2]);

                int mask = queryPath(u, v);

                // At most one character may have an odd frequency.
                answer.add((mask & (mask - 1)) == 0);
            }
        }

        return answer;
    }

    private int queryPath(int u, int v) {
        int mask = 0;

        while (head[u] != head[v]) {
            if (depth[head[u]] < depth[head[v]]) {
                int temp = u;
                u = v;
                v = temp;
            }

            mask ^= seg.query(pos[head[u]], pos[u]);
            u = parent[head[u]];
        }

        if (depth[u] > depth[v]) {
            int temp = u;
            u = v;
            v = temp;
        }

        // Includes both endpoints and the LCA.
        mask ^= seg.query(pos[u], pos[v]);

        return mask;
    }

    private static class SegmentTree {
        private int size;
        private int[] tree;

        SegmentTree(int[] values) {
            int n = values.length;
            size = 1;

            while (size < n) {
                size <<= 1;
            }

            tree = new int[size * 2];

            for (int i = 0; i < n; i++) {
                tree[size + i] = values[i];
            }

            for (int i = size - 1; i > 0; i--) {
                tree[i] = tree[i * 2] ^ tree[i * 2 + 1];
            }
        }

        void update(int index, int value) {
            int p = size + index;
            tree[p] = value;

            while (p > 1) {
                p >>= 1;
                tree[p] = tree[p * 2] ^ tree[p * 2 + 1];
            }
        }

        int query(int left, int right) {
            left += size;
            right += size;
            int result = 0;

            while (left <= right) {
                if ((left & 1) == 1) {
                    result ^= tree[left++];
                }

                if ((right & 1) == 0) {
                    result ^= tree[right--];
                }

                left >>= 1;
                right >>= 1;
            }

            return result;
        }
    }
}

class Solution {

    static class Node {
        int len;
        int prefix;
        int suffix;
        int best;
        char leftChar;
        char rightChar;

        Node() {}

        Node(char c) {
            len = 1;
            prefix = 1;
            suffix = 1;
            best = 1;
            leftChar = c;
            rightChar = c;
        }
    }

    private Node[] tree;
    private char[] chars;

    public int[] longestRepeating(String s, String queryCharacters, int[] queryIndices) {
        int n = s.length();
        int k = queryIndices.length;

        chars = s.toCharArray();
        tree = new Node[4 * n];

        build(1, 0, n - 1);

        int[] result = new int[k];

        for (int i = 0; i < k; i++) {
            int index = queryIndices[i];
            char newChar = queryCharacters.charAt(i);

            if (chars[index] != newChar) {
                chars[index] = newChar;
                update(1, 0, n - 1, index, newChar);
            }

            result[i] = tree[1].best;
        }

        return result;
    }

    private void build(int node, int left, int right) {
        if (left == right) {
            tree[node] = new Node(chars[left]);
            return;
        }

        int mid = left + (right - left) / 2;

        build(node * 2, left, mid);
        build(node * 2 + 1, mid + 1, right);

        tree[node] = merge(tree[node * 2], tree[node * 2 + 1]);
    }

    private void update(int node, int left, int right, int index, char newChar) {
        if (left == right) {
            tree[node] = new Node(newChar);
            return;
        }

        int mid = left + (right - left) / 2;

        if (index <= mid) {
            update(node * 2, left, mid, index, newChar);
        } else {
            update(node * 2 + 1, mid + 1, right, index, newChar);
        }

        tree[node] = merge(tree[node * 2], tree[node * 2 + 1]);
    }

    private Node merge(Node left, Node right) {
        Node result = new Node();

        result.len = left.len + right.len;
        result.leftChar = left.leftChar;
        result.rightChar = right.rightChar;

        result.prefix = left.prefix;

        if (left.prefix == left.len && left.rightChar == right.leftChar) {
            result.prefix = left.len + right.prefix;
        }

        result.suffix = right.suffix;

        if (right.suffix == right.len && left.rightChar == right.leftChar) {
            result.suffix = right.len + left.suffix;
        }

        result.best = Math.max(left.best, right.best);

        if (left.rightChar == right.leftChar) {
            result.best = Math.max(result.best, left.suffix + right.prefix);
        }

        return result;
    }
}

class Solution {
    static final long MOD = 1_000_000_007L;

    public int sumCounts(int[] nums) {
        int n = nums.length;
        long[] sum = new long[4 * n];
        long[] sumSquares = new long[4 * n];
        long[] lazy = new long[4 * n];

        int[] last = new int[100001];
        long answer = 0;

        for (int i = 0; i < n; i++) {
            int x = nums[i];

            int previous = last[x];
            last[x] = i + 1;

            update(1, 1, n, previous + 1, i + 1,
                   sum, sumSquares, lazy);

            answer = (answer + sumSquares[1]) % MOD;
        }

        return (int) answer;
    }

    private void update(int node, int start, int end,
                        int left, int right,
                        long[] sum, long[] sumSquares,
                        long[] lazy) {
        if (left > end || right < start) {
            return;
        }

        if (left <= start && end <= right) {
            apply(node, start, end, sum, sumSquares, lazy);
            return;
        }

        pushDown(node, start, end, sum, sumSquares, lazy);

        int mid = start + (end - start) / 2;

        update(node * 2, start, mid, left, right,
               sum, sumSquares, lazy);

        update(node * 2 + 1, mid + 1, end, left, right,
               sum, sumSquares, lazy);

        sum[node] = (sum[node * 2] + sum[node * 2 + 1]) % MOD;

        sumSquares[node] =
            (sumSquares[node * 2] + sumSquares[node * 2 + 1]) % MOD;
    }

    private void apply(int node, int start, int end,
                       long[] sum, long[] sumSquares,
                       long[] lazy) {
        long len = end - start + 1L;
        long oldSum = sum[node];
        long delta = 1;

        sumSquares[node] =
            (sumSquares[node] + 2L * oldSum + len) % MOD;

        sum[node] = (oldSum + len) % MOD;

        lazy[node] = (lazy[node] + delta) % MOD;
    }

    private void pushDown(int node, int start, int end,
                          long[] sum, long[] sumSquares,
                          long[] lazy) {
        if (lazy[node] == 0 || start == end) {
            return;
        }

        int mid = start + (end - start) / 2;
        long delta = lazy[node];

        applyMultiple(node * 2, start, mid, delta,
                      sum, sumSquares, lazy);

        applyMultiple(node * 2 + 1, mid + 1, end, delta,
                      sum, sumSquares, lazy);

        lazy[node] = 0;
    }

    private void applyMultiple(int node, int start, int end,
                               long delta,
                               long[] sum, long[] sumSquares,
                               long[] lazy) {
        long len = end - start + 1L;
        long oldSum = sum[node];

        sumSquares[node] =
            (sumSquares[node] + 2L * delta % MOD * oldSum
             + delta * delta % MOD * len) % MOD;

        sum[node] = (oldSum + delta * len) % MOD;

        lazy[node] = (lazy[node] + delta) % MOD;
    }
}

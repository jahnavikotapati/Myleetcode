
class Solution {
    public long countNonDecreasingSubarrays(int[] nums, int k) {
        int n = nums.length;

        int log = 1;
        while ((1 << log) <= n) {
            log++;
        }

        long[] prefix = new long[n + 1];

        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }

        // Find next greater element to the right
        int[] nge = new int[n];
        int[] stack = new int[n];
        int top = -1;

        for (int i = n - 1; i >= 0; i--) {
            while (top >= 0 && nums[stack[top]] <= nums[i]) {
                top--;
            }

            nge[i] = top >= 0 ? stack[top] : n;
            stack[++top] = i;
        }

        // Binary lifting tables
        int[][] jump = new int[log][n];
        long[][] cost = new long[log][n];

        for (int i = 0; i < n; i++) {
            jump[0][i] = nge[i];

            int end = nge[i];

            cost[0][i] =
                (long) nums[i] * (end - i)
                - (prefix[end] - prefix[i]);
        }

        for (int j = 1; j < log; j++) {
            for (int i = 0; i < n; i++) {
                int mid = jump[j - 1][i];

                if (mid < n) {
                    jump[j][i] = jump[j - 1][mid];

                    cost[j][i] =
                        cost[j - 1][i] + cost[j - 1][mid];
                } else {
                    jump[j][i] = n + 1;
                }
            }
        }

        // Calculate cost of making nums[l...r] non-decreasing
        long answer = 0;

        for (int r = 0; r < n; r++) {
            int low = 0;
            int high = r;

            while (low <= high) {
                int mid = low + (high - low) / 2;

                long operations = 0;
                int cur = mid;

                for (int j = log - 1; j >= 0; j--) {
                    if (cur == n) {
                        break;
                    }

                    int next = jump[j][cur];

                    if (next <= r + 1) {
                        operations += cost[j][cur];
                        cur = next;
                    }
                }

                if (cur <= r) {
                    operations +=
                        (long) nums[cur] * (r - cur + 1)
                        - (prefix[r + 1] - prefix[cur]);
                }

                if (operations <= k) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            }

            answer += r - low + 1;
        }

        return answer;
    }
}

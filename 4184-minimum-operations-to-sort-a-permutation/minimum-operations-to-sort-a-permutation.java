
class Solution {
    public int minOperations(int[] nums) {
        int n = nums.length;
        int inc = 0, dec = 0;

        for (int i = 0; i < n; i++) {
            int next = nums[(i + 1) % n];

            if (next != (nums[i] + 1) % n) {
                inc++;
            }

            if (next != (nums[i] - 1 + n) % n) {
                dec++;
            }
        }

        int ans = Integer.MAX_VALUE;

        if (inc == 0) {
            int k = (n - nums[0]) % n;
            ans = Math.min(ans, Math.min(k, n - k + 2));
        }

        if (dec == 0) {
            int k = (nums[0] + 1) % n;
            ans = Math.min(ans, 1 + Math.min(k, n - k));
        }

        return ans == Integer.MAX_VALUE ? -1 : ans;
    }
}


class Solution {
    public int minimumChanges(String s, int k) {
        int n = s.length();

        // cost[i][j] = minimum changes to make s[i...j]
        // a semi-palindrome
        int[][] cost = new int[n][n];

        for (int len = 2; len <= n; len++) {
            for (int i = 0; i + len <= n; i++) {
                int j = i + len - 1;

                cost[i][j] = Integer.MAX_VALUE;

                // Try every proper divisor of substring length
                for (int d = 1; d < len; d++) {
                    if (len % d != 0) {
                        continue;
                    }

                    int changes = 0;

                    // Compare characters in each repeating group
                    for (int r = 0; r < d; r++) {
                        int left = i + r;
                        int right = i + len - d + r;

                        while (left < right) {
                            if (s.charAt(left) != s.charAt(right)) {
                                changes++;
                            }

                            left += d;
                            right -= d;
                        }
                    }

                    cost[i][j] = Math.min(cost[i][j], changes);
                }
            }
        }

        // dp[i][j] = minimum changes to divide
        // first i characters into j substrings
        int[][] dp = new int[n + 1][k + 1];

        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= k; j++) {
                dp[i][j] = Integer.MAX_VALUE / 2;
            }
        }

        dp[0][0] = 0;

        for (int i = 1; i <= n; i++) {
            for (int parts = 1; parts <= k; parts++) {

                // Each substring must have length >= 2
                for (int start = i - 2; start >= 0; start--) {

                    dp[i][parts] = Math.min(
                        dp[i][parts],
                        dp[start][parts - 1] + cost[start][i - 1]
                    );
                }
            }
        }

        return dp[n][k];
    }
}

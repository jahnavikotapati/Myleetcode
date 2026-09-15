class Solution {
    public int maxPalindromes(String s, int k) {
        int n = s.length();

        boolean[][] palindrome = new boolean[n][n];

        // Find all palindromic substrings
        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                if (s.charAt(i) == s.charAt(j) &&
                    (j - i <= 2 || palindrome[i + 1][j - 1])) {
                    palindrome[i][j] = true;
                }
            }
        }

        int[] dp = new int[n + 1];

        for (int i = 0; i < n; i++) {
            // Don't use s[i]
            dp[i + 1] = dp[i];

            // Try every palindrome ending at i
            for (int j = 0; j <= i - k + 1; j++) {
                if (palindrome[j][i]) {
                    dp[i + 1] = Math.max(dp[i + 1], dp[j] + 1);
                }
            }
        }

        return dp[n];
    }
}
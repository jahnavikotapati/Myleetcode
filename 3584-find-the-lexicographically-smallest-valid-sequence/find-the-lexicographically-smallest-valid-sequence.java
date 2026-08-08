class Solution {
    public int[] validSequence(String word1, String word2) {
        int n = word1.length();
        int m = word2.length();

        int[] suffix = new int[m + 1];
        suffix[m] = n;

        int j = m - 1;

        for (int i = n - 1; i >= 0 && j >= 0; i--) {
            if (word1.charAt(i) == word2.charAt(j)) {
                suffix[j] = i;
                j--;
            }
        }

        int[] ans = new int[m];
        int pos = 0;
        boolean changed = false;

        for (int k = 0; k < m; k++) {
            while (pos < n) {
                if (word1.charAt(pos) == word2.charAt(k)) {
                    ans[k] = pos++;
                    break;
                }

                if (!changed && (k == m - 1 || pos < suffix[k + 1])) {
                    ans[k] = pos++;
                    changed = true;
                    break;
                }

                pos++;
            }

            if (pos > n || (k > 0 && ans[k] == 0)) {
                return new int[0];
            }
        }

        return ans;
    }
}
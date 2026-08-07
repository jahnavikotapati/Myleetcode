class Solution {
    private static final int[][] FACT = {
        {0,0,0,0},
        {0,0,0,0},
        {1,0,0,0},
        {0,1,0,0},
        {2,0,0,0},
        {0,0,1,0},
        {1,1,0,0},
        {0,0,0,1},
        {3,0,0,0},
        {0,2,0,0}
    };

    private int[][] min23;

    public String smallestNumber(String num, long t) {
        int[] need = new int[4];

        while (t % 2 == 0) {
            need[0]++;
            t /= 2;
        }
        while (t % 3 == 0) {
            need[1]++;
            t /= 3;
        }
        while (t % 5 == 0) {
            need[2]++;
            t /= 5;
        }
        while (t % 7 == 0) {
            need[3]++;
            t /= 7;
        }

        if (t != 1) {
            return "-1";
        }

        buildMin23(need[0], need[1]);

        int n = num.length();

        int[][] prefix = new int[n + 1][4];
        prefix[0] = need.clone();

        int firstZero = n;

        for (int i = 0; i < n; i++) {
            int d = num.charAt(i) - '0';

            if (d == 0) {
                firstZero = i;
                break;
            }

            prefix[i + 1] = apply(prefix[i], d);
        }

        if (firstZero == n && satisfied(prefix[n])) {
            return num;
        }

        int lastPivot = Math.min(firstZero, n - 1);

        for (int i = lastPivot; i >= 0; i--) {
            int original = num.charAt(i) - '0';
            int remaining = n - i - 1;

            for (int d = original + 1; d <= 9; d++) {
                if (d == 0) {
                    continue;
                }

                int[] next = apply(prefix[i], d);

                if (minDigits(next) <= remaining) {
                    StringBuilder ans = new StringBuilder(n);

                    ans.append(num, 0, i);
                    ans.append(d);
                    ans.append(buildSuffix(next, remaining));

                    return ans.toString();
                }
            }
        }

        int required = minDigits(need);
        int length = Math.max(n + 1, required);

        return buildSuffix(need, length);
    }

    private void buildMin23(int maxA, int maxB) {
        min23 = new int[maxA + 1][maxB + 1];

        for (int a = 0; a <= maxA; a++) {
            for (int b = 0; b <= maxB; b++) {
                int best = Integer.MAX_VALUE;

                int limit = Math.min(a, b);

                for (int six = 0; six <= limit; six++) {
                    int remA = a - six;
                    int remB = b - six;

                    int count = six
                            + (remA + 2) / 3
                            + (remB + 1) / 2;

                    best = Math.min(best, count);
                }

                min23[a][b] = best;
            }
        }
    }

    private int[] apply(int[] need, int digit) {
        return new int[] {
            Math.max(0, need[0] - FACT[digit][0]),
            Math.max(0, need[1] - FACT[digit][1]),
            Math.max(0, need[2] - FACT[digit][2]),
            Math.max(0, need[3] - FACT[digit][3])
        };
    }

    private int minDigits(int[] need) {
        return min23[need[0]][need[1]] + need[2] + need[3];
    }

    private boolean satisfied(int[] need) {
        return need[0] == 0
                && need[1] == 0
                && need[2] == 0
                && need[3] == 0;
    }

    private String buildSuffix(int[] state, int length) {
        StringBuilder sb = new StringBuilder(length);

        int[] need = state.clone();

        for (int pos = 0; pos < length; pos++) {
            int remaining = length - pos - 1;

            for (int d = 1; d <= 9; d++) {
                int[] next = apply(need, d);

                if (minDigits(next) <= remaining) {
                    sb.append(d);
                    need = next;
                    break;
                }
            }
        }

        return sb.toString();
    }
}
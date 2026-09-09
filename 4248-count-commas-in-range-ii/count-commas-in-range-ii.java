class Solution {
    public long countCommas(long n) {
        long total = 0;

        // Numbers with 4 to 6 digits
        total += Math.max(0L, Math.min(n, 999_999L) - 999L);

        // Numbers with 7 to 9 digits
        if (n >= 1_000_000L) {
            total += 2 * (Math.min(n, 999_999_999L) - 999_999L);
        }

        // Numbers with 10 to 12 digits
        if (n >= 1_000_000_000L) {
            total += 3 * (Math.min(n, 999_999_999_999L) - 999_999_999L);
        }

        // Numbers with 13 to 15 digits
        if (n >= 1_000_000_000_000L) {
            total += 4 * (Math.min(n, 999_999_999_999_999L) - 999_999_999_999L);
        }

        // 10^15 has 5 commas? 
        // Actually 1,000,000,000,000,000 has 5 commas.
        if (n == 1_000_000_000_000_000L) {
            total += 5;
        }

        return total;
    }
}
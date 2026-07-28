class Solution:
    def smallestPalindrome(self, s: str) -> str:
        from collections import Counter

        cnt = Counter(s)
        left = []
        mid = ""

        for c in sorted(cnt):
            left.append(c * (cnt[c] // 2))
            if cnt[c] % 2:
                mid = c

        left = "".join(left)
        return left + mid + left[::-1]
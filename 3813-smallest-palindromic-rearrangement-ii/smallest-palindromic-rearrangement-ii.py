from collections import Counter
from math import comb

class Solution:
    def smallestPalindrome(self, s: str, k: int) -> str:
        cnt = Counter(s)
        half = {c: cnt[c] // 2 for c in cnt}
        mid = ""
        for c in cnt:
            if cnt[c] % 2:
                mid = c
                break

        letters = sorted(half.keys())
        total = sum(half.values())

        def ways(freq, rem):
            res = 1
            left = rem
            for c in letters:
                f = freq[c]
                if f:
                    res *= comb(left, f)
                    if res > k:
                        return res
                    left -= f
            return res

        if ways(half, total) < k:
            return ""

        first = []
        rem = total

        while rem:
            for c in letters:
                if half[c] == 0:
                    continue
                half[c] -= 1
                w = ways(half, rem - 1)
                if w >= k:
                    first.append(c)
                    rem -= 1
                    break
                k -= w
                half[c] += 1

        left = "".join(first)
        return left + mid + left[::-1]
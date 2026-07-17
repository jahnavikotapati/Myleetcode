from typing import List
from bisect import bisect_right

class Solution:
    def gcdValues(self, nums: List[int], queries: List[int]) -> List[int]:
        m = max(nums)
        freq = [0] * (m + 1)
        for x in nums:
            freq[x] += 1

        cnt = [0] * (m + 1)
        for g in range(1, m + 1):
            for x in range(g, m + 1, g):
                cnt[g] += freq[x]

        exact = [0] * (m + 1)
        for g in range(m, 0, -1):
            c = cnt[g]
            pairs = c * (c - 1) // 2
            k = g * 2
            while k <= m:
                pairs -= exact[k]
                k += g
            exact[g] = pairs

        pref = [0] * (m + 1)
        for g in range(1, m + 1):
            pref[g] = pref[g - 1] + exact[g]

        return [bisect_right(pref, q) for q in queries]
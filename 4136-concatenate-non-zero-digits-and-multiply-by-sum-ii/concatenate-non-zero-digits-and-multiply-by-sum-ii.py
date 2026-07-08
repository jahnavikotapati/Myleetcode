from bisect import bisect_left, bisect_right
from typing import List

class Solution:
    def sumAndMultiply(self, s: str, queries: List[List[int]]) -> List[int]:
        mod = 10**9 + 7
        nz = []
        pos = []
        for i, c in enumerate(s):
            if c != '0':
                nz.append(int(c))
                pos.append(i)

        k = len(nz)
        if k == 0:
            return [0] * len(queries)

        p10 = [1] * (k + 1)
        for i in range(1, k + 1):
            p10[i] = p10[i - 1] * 10 % mod

        pref_sum = [0] * (k + 1)
        pref_val = [0] * (k + 1)
        for i in range(k):
            pref_sum[i + 1] = pref_sum[i] + nz[i]
            pref_val[i + 1] = (pref_val[i] * 10 + nz[i]) % mod

        ans = []
        for l, r in queries:
            a = bisect_left(pos, l)
            b = bisect_right(pos, r)
            if a == b:
                ans.append(0)
                continue
            x = (pref_val[b] - pref_val[a] * p10[b - a]) % mod
            ans.append(x * (pref_sum[b] - pref_sum[a]) % mod)
        return ans
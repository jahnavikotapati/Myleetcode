class Solution:
    def subsequencePairCount(self, nums: List[int]) -> int:
        from math import gcd

        MOD = 10**9 + 7
        m = max(nums)
        dp = {(0, 0): 1}

        for x in nums:
            ndp = {}
            for (g1, g2), cnt in dp.items():
                ndp[(g1, g2)] = (ndp.get((g1, g2), 0) + cnt) % MOD

                ng1 = x if g1 == 0 else gcd(g1, x)
                ndp[(ng1, g2)] = (ndp.get((ng1, g2), 0) + cnt) % MOD

                ng2 = x if g2 == 0 else gcd(g2, x)
                ndp[(g1, ng2)] = (ndp.get((g1, ng2), 0) + cnt) % MOD
            dp = ndp

        ans = 0
        for (g1, g2), cnt in dp.items():
            if g1 == g2 and g1 != 0:
                ans = (ans + cnt) % MOD
        return ans
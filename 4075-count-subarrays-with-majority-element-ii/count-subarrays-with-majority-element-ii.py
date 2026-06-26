class Fenwick:
    def __init__(self, n):
        self.n = n
        self.bit = [0] * (n + 2)

    def add(self, i, v):
        while i <= self.n:
            self.bit[i] += v
            i += i & -i

    def query(self, i):
        s = 0
        while i > 0:
            s += self.bit[i]
            i -= i & -i
        return s

class Solution:
    def countMajoritySubarrays(self, nums, target):
        n = len(nums)
        size = 2 * n + 3
        bit = Fenwick(size)
        offset = n + 1
        pref = 0
        ans = 0
        bit.add(offset + pref, 1)
        for x in nums:
            pref += 1 if x == target else -1
            ans += bit.query(offset + pref - 1)
            bit.add(offset + pref, 1)
        return ans
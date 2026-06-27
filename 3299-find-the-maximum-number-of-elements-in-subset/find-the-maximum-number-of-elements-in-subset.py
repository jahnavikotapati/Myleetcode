from collections import Counter
from typing import List

class Solution:
    def maximumLength(self, nums: List[int]) -> int:
        cnt = Counter(nums)
        ans = 1

        if 1 in cnt:
            ans = max(ans, cnt[1] if cnt[1] % 2 else cnt[1] - 1)

        for x in cnt:
            if x == 1:
                continue

            cur = x
            length = 1

            while cnt[cur] >= 2 and cnt.get(cur * cur, 0):
                length += 2
                cur *= cur

            ans = max(ans, length)

        return ans
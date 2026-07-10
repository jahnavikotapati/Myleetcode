from typing import List

class Solution:
    def pathExistenceQueries(self, n: int, nums: List[int], maxDiff: int, queries: List[List[int]]) -> List[int]:
        order = sorted((nums[i], i) for i in range(n))
        pos = [0] * n
        values = [0] * n
        for i, (v, idx) in enumerate(order):
            pos[idx] = i
            values[i] = v

        comp = [-1] * n
        cid = 0
        for i in range(n):
            if i == 0 or values[i] - values[i - 1] > maxDiff:
                cid += 1
            comp[i] = cid

        nxt = [0] * n
        r = 0
        for l in range(n):
            while r + 1 < n and values[r + 1] - values[l] <= maxDiff:
                r += 1
            nxt[l] = r

        LOG = (n + 1).bit_length()
        up = [nxt]
        for _ in range(1, LOG):
            prev = up[-1]
            cur = [0] * n
            for i in range(n):
                cur[i] = prev[prev[i]]
            up.append(cur)

        ans = []
        for u, v in queries:
            if u == v:
                ans.append(0)
                continue
            pu, pv = pos[u], pos[v]
            if pu > pv:
                pu, pv = pv, pu
            if comp[pu] != comp[pv]:
                ans.append(-1)
                continue
            cur = pu
            steps = 0
            for k in range(LOG - 1, -1, -1):
                if up[k][cur] < pv:
                    cur = up[k][cur]
                    steps += 1 << k
            ans.append(steps + 1)
        return ans
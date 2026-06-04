from functools import lru_cache

class Solution:
    def totalWaviness(self, num1: int, num2: int) -> int:
        def solve(n):
            if n < 0:
                return 0
            s = str(n)

            @lru_cache(None)
            def dfs(i, tight, started, last2, last1, length):
                if i == len(s):
                    return (1, 0)

                limit = int(s[i]) if tight else 9
                cnt = 0
                total = 0

                for d in range(limit + 1):
                    nt = tight and d == limit

                    if not started and d == 0:
                        c, t = dfs(i + 1, nt, 0, 10, 10, 0)
                        cnt += c
                        total += t
                    else:
                        if not started:
                            c, t = dfs(i + 1, nt, 1, 10, d, 1)
                            cnt += c
                            total += t
                        else:
                            add = 0
                            if length >= 2:
                                if (last1 > last2 and last1 > d) or (last1 < last2 and last1 < d):
                                    add = 1
                            c, t = dfs(i + 1, nt, 1, last1, d, length + 1)
                            cnt += c
                            total += t + add * c

                return cnt, total

            return dfs(0, 1, 0, 10, 10, 0)[1]

        return solve(num2) - solve(num1 - 1)
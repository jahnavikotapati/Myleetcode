from functools import lru_cache

class Solution:
    def totalWaviness(self, num1: int, num2: int) -> int:
        def solve(n):
            s = str(n)

            @lru_cache(None)
            def dp(pos, tight, started, l, a, b):
                if pos == len(s):
                    return (1, 0)

                limit = int(s[pos]) if tight else 9
                cnt = 0
                total = 0

                for d in range(limit + 1):
                    nt = tight and d == limit

                    if not started and d == 0:
                        c, t = dp(pos + 1, nt, 0, 0, 0, 0)
                        cnt += c
                        total += t
                    elif not started:
                        c, t = dp(pos + 1, nt, 1, 1, 0, d)
                        cnt += c
                        total += t
                    elif l == 1:
                        c, t = dp(pos + 1, nt, 1, 2, b, d)
                        cnt += c
                        total += t
                    else:
                        add = 1 if (b > a and b > d) or (b < a and b < d) else 0
                        c, t = dp(pos + 1, nt, 1, 2, b, d)
                        cnt += c
                        total += t + add * c

                return cnt, total

            return dp(0, 1, 0, 0, 0, 0)[1]

        return solve(num2) - solve(num1 - 1)
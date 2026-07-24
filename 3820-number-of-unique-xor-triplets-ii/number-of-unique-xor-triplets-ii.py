class Solution:
    def uniqueXorTriplets(self, nums: List[int]) -> int:
        M = 2048

        f = [0] * M
        for x in nums:
            f[x] = 1

        a = f[:]
        h = 1
        while h < M:
            for i in range(0, M, h * 2):
                for j in range(i, i + h):
                    x = a[j]
                    y = a[j + h]
                    a[j] = x + y
                    a[j + h] = x - y
            h <<= 1

        for i in range(M):
            a[i] = a[i] ** 3

        h = 1
        while h < M:
            for i in range(0, M, h * 2):
                for j in range(i, i + h):
                    x = a[j]
                    y = a[j + h]
                    a[j] = x + y
                    a[j + h] = x - y
            h <<= 1

        ans = 0
        for v in a:
            if v // M:
                ans += 1
        return ans
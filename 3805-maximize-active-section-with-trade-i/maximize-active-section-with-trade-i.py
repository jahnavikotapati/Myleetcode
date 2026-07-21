class Solution:
    def maxActiveSectionsAfterTrade(self, s: str) -> int:
        t = "1" + s + "1"
        n = len(t)
        ans = s.count("1")

        runs = []
        i = 0
        while i < n:
            j = i
            while j < n and t[j] == t[i]:
                j += 1
            runs.append((t[i], j - i))
            i = j

        base = ans

        for i in range(2, len(runs) - 2):
            if runs[i][0] == "1":
                gain = runs[i - 1][1] + runs[i][1] + runs[i + 1][1] - runs[i][1]
                ans = max(ans, base + gain)

        return ans
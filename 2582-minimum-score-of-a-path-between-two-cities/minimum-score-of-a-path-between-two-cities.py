from collections import defaultdict, deque

class Solution:
    def minScore(self, n: int, roads: list[list[int]]) -> int:
        graph = defaultdict(list)
        for a, b, d in roads:
            graph[a].append((b, d))
            graph[b].append((a, d))

        ans = float("inf")
        q = deque([1])
        seen = {1}

        while q:
            node = q.popleft()
            for nei, d in graph[node]:
                ans = min(ans, d)
                if nei not in seen:
                    seen.add(nei)
                    q.append(nei)

        return ans
from typing import List

class Solution:
    def countCompleteComponents(self, n: int, edges: List[List[int]]) -> int:
        graph = [[] for _ in range(n)]
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)

        vis = [False] * n
        ans = 0

        for i in range(n):
            if vis[i]:
                continue

            stack = [i]
            vis[i] = True
            nodes = []
            edge_count = 0

            while stack:
                u = stack.pop()
                nodes.append(u)
                edge_count += len(graph[u])
                for v in graph[u]:
                    if not vis[v]:
                        vis[v] = True
                        stack.append(v)

            k = len(nodes)
            if edge_count // 2 == k * (k - 1) // 2:
                ans += 1

        return ans
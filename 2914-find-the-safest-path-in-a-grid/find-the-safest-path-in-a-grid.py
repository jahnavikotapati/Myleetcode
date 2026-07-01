from collections import deque
from typing import List

class Solution:
    def maximumSafenessFactor(self, grid: List[List[int]]) -> int:
        n = len(grid)
        dist = [[-1] * n for _ in range(n)]
        q = deque()

        for i in range(n):
            for j in range(n):
                if grid[i][j]:
                    dist[i][j] = 0
                    q.append((i, j))

        dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]

        while q:
            x, y = q.popleft()
            for dx, dy in dirs:
                nx, ny = x + dx, y + dy
                if 0 <= nx < n and 0 <= ny < n and dist[nx][ny] == -1:
                    dist[nx][ny] = dist[x][y] + 1
                    q.append((nx, ny))

        def can(k):
            if dist[0][0] < k:
                return False
            q = deque([(0, 0)])
            vis = [[False] * n for _ in range(n)]
            vis[0][0] = True

            while q:
                x, y = q.popleft()
                if x == n - 1 and y == n - 1:
                    return True
                for dx, dy in dirs:
                    nx, ny = x + dx, y + dy
                    if (
                        0 <= nx < n
                        and 0 <= ny < n
                        and not vis[nx][ny]
                        and dist[nx][ny] >= k
                    ):
                        vis[nx][ny] = True
                        q.append((nx, ny))
            return False

        lo, hi = 0, min(dist[0][0], dist[n - 1][n - 1])
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if can(mid):
                lo = mid
            else:
                hi = mid - 1
        return lo
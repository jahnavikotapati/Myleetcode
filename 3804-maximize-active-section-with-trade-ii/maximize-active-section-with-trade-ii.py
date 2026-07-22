from typing import List
from bisect import bisect_left, bisect_right

class Solution:
    def maxActiveSectionsAfterTrade(
        self, s: str, queries: List[List[int]]
    ) -> List[int]:
        n = len(s)
        starts = []
        ends = []
        lengths = []

        i = 0
        while i < n:
            if s[i] == "0":
                j = i
                while j + 1 < n and s[j + 1] == "0":
                    j += 1
                starts.append(i)
                ends.append(j)
                lengths.append(j - i + 1)
                i = j + 1
            else:
                i += 1

        m = len(lengths)
        size = 1
        while size < max(1, m - 1):
            size <<= 1

        tree = [0] * (2 * size)

        for k in range(m - 1):
            tree[size + k] = lengths[k] + lengths[k + 1]

        for k in range(size - 1, 0, -1):
            tree[k] = max(tree[k * 2], tree[k * 2 + 1])

        def range_max(left: int, right: int) -> int:
            if left > right:
                return 0

            left += size
            right += size
            result = 0

            while left <= right:
                if left & 1:
                    result = max(result, tree[left])
                    left += 1
                if not right & 1:
                    result = max(result, tree[right])
                    right -= 1
                left >>= 1
                right >>= 1

            return result

        total_ones = s.count("1")
        answer = []

        for left, right in queries:
            first = bisect_left(ends, left)
            last = bisect_right(starts, right) - 1

            if first >= last:
                answer.append(total_ones)
                continue

            first_length = min(ends[first], right) - max(starts[first], left) + 1
            second_length = min(ends[first + 1], right) - starts[first + 1] + 1
            gain = first_length + second_length

            if last - 1 >= first:
                previous_length = ends[last - 1] - max(starts[last - 1], left) + 1
                last_length = min(ends[last], right) - max(starts[last], left) + 1
                gain = max(gain, previous_length + last_length)

            gain = max(gain, range_max(first + 1, last - 2))
            answer.append(total_ones + gain)

        return answer
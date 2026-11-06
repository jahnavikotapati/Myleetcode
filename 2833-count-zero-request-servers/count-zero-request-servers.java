
import java.util.*;

class Solution {
    public int[] countServers(int n, int[][] logs, int x, int[] queries) {

        Arrays.sort(logs, (a, b) -> Integer.compare(a[1], b[1]));

        int[][] sortedQueries = new int[queries.length][2];

        for (int i = 0; i < queries.length; i++) {
            sortedQueries[i][0] = queries[i];
            sortedQueries[i][1] = i;
        }

        Arrays.sort(sortedQueries, (a, b) -> Integer.compare(a[0], b[0]));

        int[] result = new int[queries.length];

        Map<Integer, Integer> map = new HashMap<>();

        int left = 0;
        int right = 0;

        for (int i = 0; i < queries.length; i++) {

            int query = sortedQueries[i][0];
            int start = query - x;

            // Add logs within the current right boundary
            while (right < logs.length && logs[right][1] <= query) {
                int server = logs[right][0];

                map.put(server, map.getOrDefault(server, 0) + 1);
                right++;
            }

            // Remove logs before the left boundary
            while (left < right && logs[left][1] < start) {
                int server = logs[left][0];

                map.put(server, map.get(server) - 1);

                if (map.get(server) == 0) {
                    map.remove(server);
                }

                left++;
            }

            result[sortedQueries[i][1]] = n - map.size();
        }

        return result;
    }
}

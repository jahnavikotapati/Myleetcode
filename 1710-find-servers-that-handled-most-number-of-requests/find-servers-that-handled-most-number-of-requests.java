
import java.util.*;

class Solution {
    public List<Integer> busiestServers(int k, int[] arrival, int[] load) {

        int n = arrival.length;

        TreeSet<Integer> available = new TreeSet<>();
        PriorityQueue<int[]> busy = new PriorityQueue<>(
            (a, b) -> Integer.compare(a[0], b[0])
        );

        int[] count = new int[k];

        // Initially, all servers are available
        for (int i = 0; i < k; i++) {
            available.add(i);
        }

        for (int i = 0; i < n; i++) {

            // Free servers whose requests are completed
            while (!busy.isEmpty() && busy.peek()[0] <= arrival[i]) {
                int[] server = busy.poll();
                available.add(server[1]);
            }

            // If all servers are busy, drop the request
            if (available.isEmpty()) {
                continue;
            }

            // Find the next available server starting from i % k
            int target = i % k;

            Integer server = available.ceiling(target);

            // Wrap around if no server is available after target
            if (server == null) {
                server = available.first();
            }

            // Assign request to the selected server
            available.remove(server);

            count[server]++;

            // Store finishing time and server ID
            busy.offer(new int[]{
                arrival[i] + load[i], server
            });
        }

        // Find maximum number of handled requests
        int max = 0;

        for (int c : count) {
            max = Math.max(max, c);
        }

        // Return all servers with maximum requests
        List<Integer> result = new ArrayList<>();

        for (int i = 0; i < k; i++) {
            if (count[i] == max) {
                result.add(i);
            }
        }

        return result;
    }
}

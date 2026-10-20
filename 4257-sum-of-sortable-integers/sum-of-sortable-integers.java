
import java.util.*;

class Solution {
    public int sortableIntegers(int[] nums) {
        int n = nums.length;
        int[] sorted = nums.clone();
        Arrays.sort(sorted);

        int ans = 0;

        for (int k = 1; k <= n; k++) {
            if (n % k != 0) {
                continue;
            }

            boolean valid = true;

            for (int start = 0; start < n; start += k) {
                int end = start + k;

                // Check whether this block can be sorted by rotation.
                int descents = 0;

                for (int i = start; i < end - 1; i++) {
                    if (nums[i] > nums[i + 1]) {
                        descents++;
                    }
                }

                if (nums[end - 1] > nums[start]) {
                    descents++;
                }

                if (descents > 1) {
                    valid = false;
                    break;
                }

                // Check whether the block has the correct elements.
                int[] block = Arrays.copyOfRange(nums, start, end);
                int[] target = Arrays.copyOfRange(sorted, start, end);

                Arrays.sort(block);
                Arrays.sort(target);

                if (!Arrays.equals(block, target)) {
                    valid = false;
                    break;
                }
            }

            if (valid) {
                ans += k;
            }
        }

        return ans;
    }
}

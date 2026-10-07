import java.util.*;

class Solution {
    Set<String> result = new HashSet<>();

    public List<String> removeInvalidParentheses(String s) {
        int leftRemove = 0;
        int rightRemove = 0;

        for (char c : s.toCharArray()) {
            if (c == '(') {
                leftRemove++;
            } else if (c == ')') {
                if (leftRemove > 0) {
                    leftRemove--;
                } else {
                    rightRemove++;
                }
            }
        }

        dfs(s, 0, leftRemove, rightRemove);

        return new ArrayList<>(result);
    }

    private void dfs(String s, int index, int leftRemove, int rightRemove) {
        if (leftRemove == 0 && rightRemove == 0) {
            if (isValid(s)) {
                result.add(s);
            }
            return;
        }

        for (int i = index; i < s.length(); i++) {

            // Skip duplicate parentheses
            if (i > index && s.charAt(i) == s.charAt(i - 1)) {
                continue;
            }

            // Remove '('
            if (leftRemove > 0 && s.charAt(i) == '(') {
                dfs(
                    s.substring(0, i) + s.substring(i + 1),
                    i,
                    leftRemove - 1,
                    rightRemove
                );
            }

            // Remove ')'
            if (rightRemove > 0 && s.charAt(i) == ')') {
                dfs(
                    s.substring(0, i) + s.substring(i + 1),
                    i,
                    leftRemove,
                    rightRemove - 1
                );
            }
        }
    }

    private boolean isValid(String s) {
        int balance = 0;

        for (char c : s.toCharArray()) {
            if (c == '(') {
                balance++;
            } else if (c == ')') {
                balance--;

                if (balance < 0) {
                    return false;
                }
            }
        }

        return balance == 0;
    }
}
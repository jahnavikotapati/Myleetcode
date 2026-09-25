class Solution {
    public List<String> braceExpansionII(String expression) {
        Set<String> result = parse(expression, 0, expression.length() - 1);
        
        List<String> answer = new ArrayList<>(result);
        Collections.sort(answer);
        return answer;
    }

    private Set<String> parse(String s, int start, int end) {
        Set<String> result = new HashSet<>();
        Set<String> current = new HashSet<>();
        current.add("");

        int i = start;

        while (i <= end) {
            char ch = s.charAt(i);

            if (ch == '{') {
                int j = findClosingBrace(s, i);

                Set<String> inside = parse(s, i + 1, j - 1);

                current = concatenate(current, inside);
                i = j + 1;

            } else if (ch == ',') {
                result.addAll(current);
                current = new HashSet<>();
                current.add("");
                i++;

            } else {
                Set<String> letter = new HashSet<>();
                letter.add(String.valueOf(ch));

                current = concatenate(current, letter);
                i++;
            }
        }

        result.addAll(current);
        return result;
    }

    private int findClosingBrace(String s, int start) {
        int count = 0;

        for (int i = start; i < s.length(); i++) {
            if (s.charAt(i) == '{') {
                count++;
            } else if (s.charAt(i) == '}') {
                count--;

                if (count == 0) {
                    return i;
                }
            }
        }

        return -1;
    }

    private Set<String> concatenate(Set<String> a, Set<String> b) {
        Set<String> result = new HashSet<>();

        for (String x : a) {
            for (String y : b) {
                result.add(x + y);
            }
        }

        return result;
    }
}
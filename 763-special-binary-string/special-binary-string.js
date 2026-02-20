/**
 * @param {string} s
 * @return {string}
 */
var makeLargestSpecial = function(s) {
    const parts = [];
    let count = 0;
    let start = 0;

    // Split into top-level special substrings
    for (let i = 0; i < s.length; i++) {
        count += s[i] === '1' ? 1 : -1;

        if (count === 0) {
            // recursively optimize inside
            const inner = makeLargestSpecial(s.slice(start + 1, i));
            parts.push('1' + inner + '0');
            start = i + 1;
        }
    }

    // Sort descending to maximize lexicographic order
    parts.sort((a, b) => b.localeCompare(a));

    return parts.join('');
};
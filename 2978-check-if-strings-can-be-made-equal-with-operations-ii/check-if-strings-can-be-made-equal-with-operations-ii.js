var checkStrings = function(s1, s2) {
    const n = s1.length;

    const even1 = new Array(26).fill(0);
    const odd1 = new Array(26).fill(0);
    const even2 = new Array(26).fill(0);
    const odd2 = new Array(26).fill(0);

    for (let i = 0; i < n; i++) {
        const c1 = s1.charCodeAt(i) - 97;
        const c2 = s2.charCodeAt(i) - 97;

        if (i % 2 === 0) {
            even1[c1]++;
            even2[c2]++;
        } else {
            odd1[c1]++;
            odd2[c2]++;
        }
    }

    for (let i = 0; i < 26; i++) {
        if (even1[i] !== even2[i] || odd1[i] !== odd2[i]) return false;
    }

    return true;
};
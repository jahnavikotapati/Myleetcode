var generateString = function(str1, str2) {
    const n = str1.length, m = str2.length;
    const res = new Array(n + m - 1).fill('?');

    for (let i = 0; i < n; i++) {
        if (str1[i] === 'T') {
            for (let j = 0; j < m; j++) {
                if (res[i + j] === '?' || res[i + j] === str2[j]) {
                    res[i + j] = str2[j];
                } else {
                    return "";
                }
            }
        }
    }

    const buildLPS = (pat) => {
        const lps = new Array(pat.length).fill(0);
        let j = 0;
        for (let i = 1; i < pat.length; i++) {
            while (j > 0 && pat[i] !== pat[j]) j = lps[j - 1];
            if (pat[i] === pat[j]) j++;
            lps[i] = j;
        }
        return lps;
    };

    const lps = buildLPS(str2);

    const checkMatch = (start) => {
        for (let j = 0; j < m; j++) {
            if (res[start + j] !== str2[j]) return false;
        }
        return true;
    };

    for (let i = 0; i < n + m - 1; i++) {
        if (res[i] === '?') res[i] = 'a';
    }

    for (let i = 0; i < n; i++) {
        if (str1[i] === 'F') {
            if (checkMatch(i)) {
                let changed = false;
                for (let j = m - 1; j >= 0; j--) {
                    if (res[i + j] === str2[j]) {
                        for (let c = 0; c < 26; c++) {
                            const ch = String.fromCharCode(97 + c);
                            if (ch !== str2[j]) {
                                const old = res[i + j];
                                res[i + j] = ch;
                                let valid = true;
                                for (let k = Math.max(0, i - m + 1); k <= Math.min(n - 1, i + j); k++) {
                                    if (str1[k] === 'T' && !checkMatch(k)) {
                                        valid = false;
                                        break;
                                    }
                                }
                                if (valid) {
                                    changed = true;
                                    break;
                                }
                                res[i + j] = old;
                            }
                        }
                    }
                    if (changed) break;
                }
                if (!changed) return "";
            }
        }
    }

    return res.join('');
};
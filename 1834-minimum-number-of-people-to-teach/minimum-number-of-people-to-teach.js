var minimumTeachings = function(n, languages, friendships) {
    let m = languages.length;
    let langSets = new Array(m);
    for (let i = 0; i < m; i++) {
        langSets[i] = new Set(languages[i]);
    }

    let needTeach = new Set();
    for (let [u, v] of friendships) {
        u--; v--;
        let canCommunicate = false;
        for (let l of langSets[u]) {
            if (langSets[v].has(l)) {
                canCommunicate = true;
                break;
            }
        }
        if (!canCommunicate) {
            needTeach.add(u);
            needTeach.add(v);
        }
    }

    if (needTeach.size === 0) return 0;

    let freq = new Array(n + 1).fill(0);
    for (let user of needTeach) {
        for (let l of langSets[user]) {
            freq[l]++;
        }
    }

    let maxCommon = Math.max(...freq);
    return needTeach.size - maxCommon;
};

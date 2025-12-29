var pyramidTransition = function (bottom, allowed) {
    const map = new Map();
    for (const s of allowed) {
        const key = s[0] + s[1];
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(s[2]);
    }

    function dfs(row) {
        if (row.length === 1) return true;

        function build(i, next) {
            if (i === row.length - 1) return dfs(next);
            const key = row[i] + row[i + 1];
            if (!map.has(key)) return false;
            for (const c of map.get(key)) {
                if (build(i + 1, next + c)) return true;
            }
            return false;
        }

        return build(0, "");
    }

    return dfs(bottom);
};

var countCoveredBuildings = function(n, buildings) {
    const map = new Map();
    for (const [x, y] of buildings) {
        if (!map.has(x)) map.set(x, new Set());
        map.get(x).add(y);
    }

    let covered = 0;
    const rows = new Map();
    const cols = new Map();
    for (const [x, y] of buildings) {
        if (!rows.has(x)) rows.set(x, []);
        rows.get(x).push(y);
        if (!cols.has(y)) cols.set(y, []);
        cols.get(y).push(x);
    }

    for (const arr of rows.values()) arr.sort((a,b)=>a-b);
    for (const arr of cols.values()) arr.sort((a,b)=>a-b);

    for (const [x, y] of buildings) {
        const r = rows.get(x);
        const c = cols.get(y);

        let i = r.indexOf(y);
        if (i === -1 || i === 0 || i === r.length - 1) continue;

        let j = c.indexOf(x);
        if (j === -1 || j === 0 || j === c.length - 1) continue;

        covered++;
    }

    return covered;
};

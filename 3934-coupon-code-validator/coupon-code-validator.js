var validateCoupons = function(code, businessLine, isActive) {
    const order = ["electronics", "grocery", "pharmacy", "restaurant"];
    const rank = new Map(order.map((v, i) => [v, i]));
    const valid = [];

    for (let i = 0; i < code.length; i++) {
        if (!isActive[i]) continue;
        if (!rank.has(businessLine[i])) continue;
        if (!/^[A-Za-z0-9_]+$/.test(code[i])) continue;
        valid.push([businessLine[i], code[i]]);
    }

    valid.sort((a, b) => {
        const r = rank.get(a[0]) - rank.get(b[0]);
        if (r !== 0) return r;
        if (a[1] < b[1]) return -1;
        if (a[1] > b[1]) return 1;
        return 0;
    });

    return valid.map(v => v[1]);
};

class Fenwick {
    constructor(n) {
        this.n = n;
        this.bit = Array(n + 1).fill(0);
    }
    add(i, v) {
        for (i++; i <= this.n; i += i & -i) this.bit[i] += v;
    }
    sum(i) {
        let s = 0;
        for (i++; i > 0; i -= i & -i) s += this.bit[i];
        return s;
    }
    kth(k) {
        let idx = 0;
        let bit = 1;
        while ((bit << 1) <= this.n) bit <<= 1;
        for (let d = bit; d; d >>= 1) {
            let nxt = idx + d;
            if (nxt <= this.n && this.bit[nxt] < k) {
                idx = nxt;
                k -= this.bit[nxt];
            }
        }
        return idx;
    }
}

class SegTree {
    constructor(n) {
        this.n = n;
        this.seg = Array(n * 4).fill(0);
    }
    update(idx, val, node = 1, l = 0, r = this.n - 1) {
        if (l === r) {
            this.seg[node] = val;
            return;
        }
        const m = (l + r) >> 1;
        if (idx <= m) this.update(idx, val, node * 2, l, m);
        else this.update(idx, val, node * 2 + 1, m + 1, r);
        this.seg[node] = Math.max(this.seg[node * 2], this.seg[node * 2 + 1]);
    }
    query(L, R, node = 1, l = 0, r = this.n - 1) {
        if (L > r || R < l) return 0;
        if (L <= l && r <= R) return this.seg[node];
        const m = (l + r) >> 1;
        return Math.max(
            this.query(L, R, node * 2, l, m),
            this.query(L, R, node * 2 + 1, m + 1, r)
        );
    }
}

var getResults = function (queries) {
    let maxX = 0;
    const obs = [];
    for (const q of queries) {
        maxX = Math.max(maxX, q[1]);
        if (q[0] === 1) obs.push(q[1]);
    }

    const LIM = maxX + 1;
    const n = LIM + 1;

    const fw = new Fenwick(n);
    const seg = new SegTree(n);

    const pos = [0, LIM, ...obs].sort((a, b) => a - b);

    let prev = pos[0];
    fw.add(prev, 1);

    for (let i = 1; i < pos.length; i++) {
        const cur = pos[i];
        fw.add(cur, 1);
        seg.update(cur, cur - prev);
        prev = cur;
    }

    const pred = (x) => {
        const cnt = fw.sum(x);
        return fw.kth(cnt);
    };

    const res = [];

    for (let i = queries.length - 1; i >= 0; i--) {
        const q = queries[i];

        if (q[0] === 2) {
            const [_, x, sz] = q;
            const p = pred(x);
            const best = Math.max(seg.query(0, p), x - p);
            res.push(best >= sz);
        } else {
            const p = q[1];
            const left = pred(p - 1);
            const rank = fw.sum(p);
            const right = fw.kth(rank + 1);

            seg.update(right, right - left);
            seg.update(p, 0);
            fw.add(p, -1);
        }
    }

    return res.reverse();
};
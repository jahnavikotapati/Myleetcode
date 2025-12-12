var countMentions = function(numberOfUsers, events) {
    const mentions = Array(numberOfUsers).fill(0);
    const offlineUntil = Array(numberOfUsers).fill(0);
    const ev = events.map((e,i)=>({type:e[0], t:parseInt(e[1]), s:e[2], idx:i}));
    ev.sort((a,b)=>{
        if (a.t !== b.t) return a.t - b.t;
        if (a.type === b.type) return a.idx - b.idx;
        return a.type === "OFFLINE" ? -1 : 1;
    });
    let curT = -1;
    for (const e of ev) {
        if (e.t !== curT) {
            curT = e.t;
            for (let u = 0; u < numberOfUsers; u++) if (offlineUntil[u] <= curT) offlineUntil[u] = 0;
        }
        if (e.type === "OFFLINE") {
            const id = parseInt(e.s);
            offlineUntil[id] = e.t + 60;
        } else {
            const s = e.s;
            if (s === "ALL") {
                for (let u = 0; u < numberOfUsers; u++) mentions[u]++;
            } else if (s === "HERE") {
                for (let u = 0; u < numberOfUsers; u++) if (offlineUntil[u] === 0) mentions[u]++;
            } else {
                const parts = s.split(" ");
                for (const p of parts) {
                    const id = parseInt(p.slice(2));
                    mentions[id]++;
                }
            }
        }
    }
    return mentions;
};

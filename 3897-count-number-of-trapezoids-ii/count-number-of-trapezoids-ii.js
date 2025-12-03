var countTrapezoids = function(points) {
    const n = points.length;
    function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){let t=a%b;a=b;b=t;}return a;}
    function normalizePair(dy,dx){
        if(dx===0) return [1,0];
        if(dy===0) return [0,1];
        let g=gcd(dy,dx);
        dy/=g; dx/=g;
        if(dx<0){dy=-dy;dx=-dx;}
        return [dy,dx];
    }
    const slopeLines = new Map();
    for(let i=0;i<n;i++){
        const [x1,y1]=points[i];
        for(let j=i+1;j<n;j++){
            const [x2,y2]=points[j];
            const dy=y2-y1, dx=x2-x1;
            const [ny,nx]=normalizePair(dy,dx);
            const slopeKey = ny + "," + nx;
            const c = ny * x1 - nx * y1;
            if(!slopeLines.has(slopeKey)) slopeLines.set(slopeKey, new Map());
            const m = slopeLines.get(slopeKey);
            m.set(c, (m.get(c)||0) + 1);
        }
    }
    let trapezoidPairs = 0;
    for(const m of slopeLines.values()){
        let S = 0;
        let sumSq = 0;
        for(const cnt of m.values()){
            S += cnt;
            sumSq += cnt * cnt;
        }
        if(S >= 2) trapezoidPairs += (S * S - sumSq) / 2;
    }
    const midMap = new Map();
    for(let i=0;i<n;i++){
        const [x1,y1]=points[i];
        for(let j=i+1;j<n;j++){
            const [x2,y2]=points[j];
            const midKey = (x1 + x2) + "," + (y1 + y2);
            const [ny,nx]=normalizePair(y2 - y1, x2 - x1);
            const slope = ny + "," + nx;
            if(!midMap.has(midKey)) midMap.set(midKey, new Map());
            const mm = midMap.get(midKey);
            mm.set("__tot", (mm.get("__tot")||0) + 1);
            mm.set(slope, (mm.get(slope)||0) + 1);
        }
    }
    let parallelograms = 0;
    for(const mm of midMap.values()){
        const tot = mm.get("__tot") || 0;
        if(tot < 2) continue;
        let totalPairs = (tot * (tot - 1)) >> 1;
        let collinearPairs = 0;
        for(const [k,v] of mm.entries()){
            if(k === "__tot") continue;
            if(v > 1) collinearPairs += (v * (v - 1)) >> 1;
        }
        parallelograms += totalPairs - collinearPairs;
    }
    return trapezoidPairs - parallelograms;
};

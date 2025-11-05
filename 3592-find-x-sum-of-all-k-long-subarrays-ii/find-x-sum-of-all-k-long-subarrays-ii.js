var findXSum = function(nums, k, x) {
    const n = nums.length;
    const res = new Array(n - k + 1);
    const freq = new Map();
    class Heap {
        constructor(cmp){ this.a=[]; this.cmp=cmp; }
        push(v){ this.a.push(v); let i=this.a.length-1; while(i>0){ let p=(i-1)>>1; if(this.cmp(this.a[i],this.a[p])<0){ [this.a[i],this.a[p]]=[this.a[p],this.a[i]]; i=p; } else break; } }
        pop(){ if(this.a.length===0) return null; const r=this.a[0]; const last=this.a.pop(); if(this.a.length){ this.a[0]=last; let i=0; while(true){ let l=2*i+1, rI=2*i+2, best=i; if(l<this.a.length && this.cmp(this.a[l],this.a[best])<0) best=l; if(rI<this.a.length && this.cmp(this.a[rI],this.a[best])<0) best=rI; if(best===i) break; [this.a[i],this.a[best]]=[this.a[best],this.a[i]]; i=best; } } return r; }
        peek(){ return this.a.length? this.a[0] : null; }
        size(){ return this.a.length; }
    }
    const candCmp = (A,B)=>{ if(A.c!==B.c) return (A.c>B.c)?-1:1; if(A.v!==B.v) return (A.v>B.v)?-1:1; return 0; };
    const selCmp = (A,B)=>{ if(A.c!==B.c) return (A.c<B.c)?-1:1; if(A.v!==B.v) return (A.v<B.v)?-1:1; return 0; };
    const cand = new Heap(candCmp);
    const sel = new Heap(selCmp);
    const inSel = new Set();
    let selSum = 0;

    const popValidCand = ()=>{
        while(true){
            const t = cand.pop();
            if(!t) return null;
            const cur = freq.get(t.v) || 0;
            if(cur===t.c && !inSel.has(t.v)) return t;
        }
    };
    const popValidSel = ()=>{
        while(true){
            const t = sel.pop();
            if(!t) return null;
            const cur = freq.get(t.v) || 0;
            if(cur===t.c && inSel.has(t.v)) return t;
        }
    };
    const peekValidCand = ()=>{
        while(true){
            const t = cand.peek();
            if(!t) return null;
            const cur = freq.get(t.v) || 0;
            if(cur===t.c && !inSel.has(t.v)) return t;
            cand.pop();
        }
    };
    const peekValidSel = ()=>{
        while(true){
            const t = sel.peek();
            if(!t) return null;
            const cur = freq.get(t.v) || 0;
            if(cur===t.c && inSel.has(t.v)) return t;
            sel.pop();
        }
    };

    const rebalance = ()=>{
        while(inSel.size < x){
            const t = popValidCand();
            if(!t) break;
            inSel.add(t.v);
            selSum += t.v * t.c;
            sel.push({v:t.v,c:t.c});
        }
        while(inSel.size > x){
            const t = popValidSel();
            if(!t) break;
            inSel.delete(t.v);
            selSum -= t.v * t.c;
            cand.push({v:t.v,c:t.c});
        }
        while(true){
            const best = peekValidCand();
            const worst = peekValidSel();
            if(!best || !worst) break;
            const better = (best.c > worst.c) || (best.c===worst.c && best.v > worst.v);
            if(!better) break;
            popValidCand();
            popValidSel();
            inSel.delete(worst.v);
            selSum -= worst.v * worst.c;
            cand.push({v:worst.v,c: freq.get(worst.v) || 0});
            inSel.add(best.v);
            selSum += best.v * best.c;
            sel.push({v:best.v,c: freq.get(best.v) || 0});
        }
    };

    const addVal = (v)=>{
        const old = freq.get(v) || 0;
        const nw = old + 1;
        freq.set(v, nw);
        if(inSel.has(v)){
            selSum += v;
            sel.push({v:v,c:nw});
        } else {
            cand.push({v:v,c:nw});
        }
    };
    const removeVal = (v)=>{
        const old = freq.get(v) || 0;
        const nw = old - 1;
        if(nw<=0) freq.delete(v); else freq.set(v, nw);
        if(inSel.has(v)){
            selSum -= v;
            if(nw<=0){
                inSel.delete(v);
            } else {
                sel.push({v:v,c:nw});
            }
        } else {
            if(nw>0) cand.push({v:v,c:nw});
        }
    };

    for(let i=0;i<k;i++) freq.set(nums[i], (freq.get(nums[i])||0)+1);
    for(const [v,c] of freq.entries()) cand.push({v:v,c:c});
    rebalance();
    res[0] = selSum;
    for(let i=k;i<n;i++){
        const inV = nums[i];
        const outV = nums[i-k];
        addVal(inV);
        removeVal(outV);
        rebalance();
        res[i-k+1] = selSum;
    }
    return res;
};

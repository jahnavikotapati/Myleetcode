function swimInWater(grid){
  const n = grid.length;
  class MinHeap{
    constructor(){ this.a = [] }
    push(v){ this.a.push(v); this._siftUp(this.a.length-1) }
    pop(){ if(!this.a.length) return null; const r = this.a[0]; const last = this.a.pop(); if(this.a.length){ this.a[0]=last; this._siftDown(0) } return r }
    _cmp(i,j){ return this.a[i][0] < this.a[j][0] }
    _siftUp(i){ while(i>0){ const p = (i-1)>>1; if(this._cmp(i,p)){ [this.a[i],this.a[p]]=[this.a[p],this.a[i]]; i=p } else break } }
    _siftDown(i){ const n=this.a.length; while(true){ let l=2*i+1,r=2*i+2,small=i; if(l<n && this._cmp(l,small)) small=l; if(r<n && this._cmp(r,small)) small=r; if(small===i) break; [this.a[i],this.a[small]]=[this.a[small],this.a[i]]; i=small } }
    size(){ return this.a.length }
  }
  const heap=new MinHeap();
  const vis=Array.from({length:n},()=>Array(n).fill(false));
  heap.push([grid[0][0],0,0]);
  const dirs=[[1,0],[-1,0],[0,1],[0,-1]];
  while(heap.size()){
    const [t,x,y]=heap.pop();
    if(vis[x][y]) continue;
    vis[x][y]=true;
    if(x===n-1 && y===n-1) return t;
    for(const [dx,dy] of dirs){
      const nx=x+dx, ny=y+dy;
      if(nx<0||ny<0||nx>=n||ny>=n||vis[nx][ny]) continue;
      heap.push([Math.max(t,grid[nx][ny]),nx,ny]);
    }
  }
  return -1;
}

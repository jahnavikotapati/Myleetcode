class Router {
  constructor(memoryLimit) {
    this.memoryLimit = memoryLimit;
    this.queue = [];
    this.packetSet = new Set();
    this.destMap = new Map();
  }

  addPacket(source, destination, timestamp) {
    const key = `${source},${destination},${timestamp}`;
    if (this.packetSet.has(key)) return false;

    if (this.queue.length === this.memoryLimit) {
      const [s, d, t] = this.queue.shift();
      this.packetSet.delete(`${s},${d},${t}`);
      const arr = this.destMap.get(d);
      if (arr) {
        if (arr[0] === t) arr.shift();
        else {
          const idx = arr.indexOf(t);
          if (idx !== -1) arr.splice(idx, 1);
        }
        if (arr.length === 0) this.destMap.delete(d);
      }
    }

    this.queue.push([source, destination, timestamp]);
    this.packetSet.add(key);
    if (!this.destMap.has(destination)) this.destMap.set(destination, []);
    this.destMap.get(destination).push(timestamp);
    return true;
  }

  forwardPacket() {
    if (this.queue.length === 0) return [];
    const [s, d, t] = this.queue.shift();
    this.packetSet.delete(`${s},${d},${t}`);
    const arr = this.destMap.get(d);
    if (arr) {
      if (arr[0] === t) arr.shift();
      else {
        const idx = arr.indexOf(t);
        if (idx !== -1) arr.splice(idx, 1);
      }
      if (arr.length === 0) this.destMap.delete(d);
    }
    return [s, d, t];
  }

  getCount(destination, startTime, endTime) {
    const arr = this.destMap.get(destination) || [];
    let l = 0, r = arr.length - 1, left = arr.length, right = -1;

    while (l <= r) {
      const m = Math.floor((l + r) / 2);
      if (arr[m] >= startTime) {
        left = m;
        r = m - 1;
      } else l = m + 1;
    }

    l = 0; r = arr.length - 1;
    while (l <= r) {
      const m = Math.floor((l + r) / 2);
      if (arr[m] <= endTime) {
        right = m;
        l = m + 1;
      } else r = m - 1;
    }

    return right >= left ? right - left + 1 : 0;
  }
}

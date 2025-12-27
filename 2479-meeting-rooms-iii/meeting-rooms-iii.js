var mostBooked = function (n, meetings) {
  meetings.sort((a, b) => a[0] - b[0])

  const free = []
  for (let i = 0; i < n; i++) free.push(i)

  const busy = []
  const count = Array(n).fill(0)

  const heapPush = (heap, item, cmp) => {
    heap.push(item)
    let i = heap.length - 1
    while (i > 0) {
      let p = (i - 1) >> 1
      if (cmp(heap[p], heap[i]) <= 0) break
      ;[heap[p], heap[i]] = [heap[i], heap[p]]
      i = p
    }
  }

  const heapPop = (heap, cmp) => {
    const top = heap[0]
    const last = heap.pop()
    if (heap.length) {
      heap[0] = last
      let i = 0
      while (true) {
        let l = i * 2 + 1
        let r = l + 1
        let s = i
        if (l < heap.length && cmp(heap[l], heap[s]) < 0) s = l
        if (r < heap.length && cmp(heap[r], heap[s]) < 0) s = r
        if (s === i) break
        ;[heap[i], heap[s]] = [heap[s], heap[i]]
        i = s
      }
    }
    return top
  }

  const freeCmp = (a, b) => a - b
  const busyCmp = (a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]

  for (const [start, end] of meetings) {
    while (busy.length && busy[0][0] <= start) {
      const [, room] = heapPop(busy, busyCmp)
      heapPush(free, room, freeCmp)
    }

    if (free.length) {
      const room = heapPop(free, freeCmp)
      heapPush(busy, [end, room], busyCmp)
      count[room]++
    } else {
      const [t, room] = heapPop(busy, busyCmp)
      const duration = end - start
      heapPush(busy, [t + duration, room], busyCmp)
      count[room]++
    }
  }

  let ans = 0
  for (let i = 1; i < n; i++) {
    if (count[i] > count[ans]) ans = i
  }
  return ans
}

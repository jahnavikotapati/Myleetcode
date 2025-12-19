var findAllPeople = function (n, meetings, firstPerson) {
  meetings.sort((a, b) => a[2] - b[2]);

  const know = new Set([0, firstPerson]);
  let i = 0;

  while (i < meetings.length) {
    let j = i;
    const map = new Map();

    while (j < meetings.length && meetings[j][2] === meetings[i][2]) {
      const [x, y] = meetings[j];
      if (!map.has(x)) map.set(x, []);
      if (!map.has(y)) map.set(y, []);
      map.get(x).push(y);
      map.get(y).push(x);
      j++;
    }

    const queue = [];
    const seen = new Set();

    for (const p of map.keys()) {
      if (know.has(p)) {
        queue.push(p);
        seen.add(p);
      }
    }

    while (queue.length) {
      const u = queue.shift();
      know.add(u);
      for (const v of map.get(u)) {
        if (!seen.has(v)) {
          seen.add(v);
          queue.push(v);
        }
      }
    }

    i = j;
  }

  return Array.from(know);
};

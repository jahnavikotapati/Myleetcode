var maxTwoEvents = function (events) {
  events.sort((a, b) => a[0] - b[0]);

  const byEnd = events
    .map(e => [e[1], e[2]])
    .sort((a, b) => a[0] - b[0]);

  let ans = 0;
  let best = 0;
  let j = 0;

  for (let i = 0; i < events.length; i++) {
    const [start, end, val] = events[i];

    while (j < byEnd.length && byEnd[j][0] < start) {
      best = Math.max(best, byEnd[j][1]);
      j++;
    }

    ans = Math.max(ans, best + val);
    ans = Math.max(ans, val);
  }

  return ans;
};

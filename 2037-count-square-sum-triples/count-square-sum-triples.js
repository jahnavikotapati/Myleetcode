function countTriples(n) {
  let count = 0;
  for (let a = 1; a <= n; a++) {
    for (let b = 1; b <= n; b++) {
      const s = a * a + b * b;
      const c = Math.sqrt(s);
      if (Number.isInteger(c) && c <= n) count++;
    }
  }
  return count;
}

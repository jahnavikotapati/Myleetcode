function longestBalanced(s) {
  const n = s.length;

  let maxRun = 1, run = 1;
  for (let i = 1; i < n; i++) {
    if (s[i] === s[i - 1]) run++;
    else run = 1;
    if (run > maxRun) maxRun = run;
  }

  const mapAB = new Map();
  const mapAC = new Map();
  const mapBC = new Map();
  const mapABC = new Map();

  let a = 0, b = 0, c = 0;
  mapAB.set(`0#0`, 0);
  mapAC.set(`0#0`, 0);
  mapBC.set(`0#0`, 0);
  mapABC.set(`0#0`, 0);

  let ans = 0;

  for (let i = 1; i <= n; i++) {
    const ch = s.charCodeAt(i - 1);
    if (ch === 97) a++;
    else if (ch === 98) b++;
    else c++;

    const kAB = `${a - b}#${c}`;
    const kAC = `${a - c}#${b}`;
    const kBC = `${b - c}#${a}`;
    const kABC = `${a - b}#${a - c}`;

    if (mapAB.has(kAB)) ans = Math.max(ans, i - mapAB.get(kAB));
    else mapAB.set(kAB, i);

    if (mapAC.has(kAC)) ans = Math.max(ans, i - mapAC.get(kAC));
    else mapAC.set(kAC, i);

    if (mapBC.has(kBC)) ans = Math.max(ans, i - mapBC.get(kBC));
    else mapBC.set(kBC, i);

    if (mapABC.has(kABC)) ans = Math.max(ans, i - mapABC.get(kABC));
    else mapABC.set(kABC, i);
  }

  return Math.max(ans, maxRun);
}

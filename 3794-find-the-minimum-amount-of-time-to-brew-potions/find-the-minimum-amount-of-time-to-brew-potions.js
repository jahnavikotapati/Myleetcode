function minTime(skill, mana) {
  const n = skill.length, m = mana.length;
  const S = new Array(n);
  for (let i = 0; i < n; i++) S[i] = skill[i] + (i ? S[i - 1] : 0);
  const s = new Array(m).fill(0);
  for (let j = 1; j < m; j++) {
    let best = -1e18;
    for (let i = 0; i < n; i++) {
      const prevS = i ? S[i - 1] : 0;
      const val = mana[j - 1] * S[i] - mana[j] * prevS;
      if (val > best) best = val;
    }
    s[j] = s[j - 1] + best;
  }
  return s[m - 1] + mana[m - 1] * S[n - 1];
}

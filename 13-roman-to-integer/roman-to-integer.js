function romanToInt(s) {
  const romanMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  };

  let total = 0;

  for (let i = 0; i < s.length; i++) {
    const currVal = romanMap[s[i]];
    const nextVal = romanMap[s[i + 1]];

    if (nextVal > currVal) {
      total += nextVal - currVal;
      i++; // skip next character
    } else {
      total += currVal;
    }
  }

  return total;
}
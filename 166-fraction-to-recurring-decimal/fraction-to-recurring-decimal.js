function fractionToDecimal(numerator, denominator) {
  if (denominator === 0) throw new Error("denominator cannot be 0");
  if (numerator === 0) return "0";
  let n = BigInt(numerator), d = BigInt(denominator);
  const neg = (n < 0n) !== (d < 0n);
  if (n < 0n) n = -n;
  if (d < 0n) d = -d;
  const intPart = n / d;
  let rem = n % d;
  let res = (neg ? "-" : "") + intPart.toString();
  if (rem === 0n) return res;
  res += ".";
  const map = new Map();
  const digits = [];
  while (rem !== 0n) {
    if (map.has(rem)) {
      const idx = map.get(rem);
      return res + digits.slice(0, idx).join("") + "(" + digits.slice(idx).join("") + ")";
    }
    map.set(rem, digits.length);
    rem *= 10n;
    const digit = rem / d;
    digits.push(digit.toString());
    rem = rem % d;
  }
  return res + digits.join("");
}

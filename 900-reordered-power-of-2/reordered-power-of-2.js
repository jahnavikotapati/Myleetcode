/**
 * @param {number} n
 * @return {boolean}
 */
var reorderedPowerOf2 = function(n) {
  const sortDigits = s => s.split('').sort().join('');
  const target = sortDigits(String(n));
  for (let i = 0; i <= 30; i++) {
    if (sortDigits(String(1 << i)) === target) return true;
  }

  return false;
};
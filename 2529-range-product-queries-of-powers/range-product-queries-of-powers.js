var productQueries = function(n, queries) {
  const MOD = 1000000007n;
  let bn = BigInt(n);
  const powers = [];
  let bit = 0;
  while (bn > 0n) {
    if (bn & 1n) powers.push(1n << BigInt(bit));
    bn >>= 1n;
    bit++;
  }
  const ans = [];
  for (const [l, r] of queries) {
    let prod = 1n;
    for (let i = l; i <= r; i++) {
      prod = (prod * powers[i]) % MOD;
    }
    ans.push(Number(prod)); 
  }
  return ans;
};

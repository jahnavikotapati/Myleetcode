var MOD = 1000000007n;
function magicalSum(m, k, nums) {
  let n = nums.length;
  let fact = new Array(m+1).fill(1n);
  for (let i = 1; i <= m; i++) fact[i] = fact[i-1] * BigInt(i) % MOD;
  let invfact = new Array(m+1).fill(1n);
  function modPow(a, e) {
    a %= MOD;
    let r = 1n;
    let A = a;
    let E = BigInt(e);
    while (E > 0n) {
      if (E & 1n) r = (r * A) % MOD;
      A = (A * A) % MOD;
      E >>= 1n;
    }
    return r;
  }
  invfact[m] = modPow(fact[m], MOD - 2n);
  for (let i = m; i > 0; i--) invfact[i-1] = invfact[i] * BigInt(i) % MOD;
  let bnums = nums.map(x => BigInt(x) % MOD);
  let powNums = Array.from({ length: n }, () => new Array(m+1).fill(1n));
  for (let i = 0; i < n; i++) {
    for (let c = 1; c <= m; c++) powNums[i][c] = powNums[i][c-1] * bnums[i] % MOD;
  }
  let dp = new Array(m+1);
  for (let s = 0; s <= m; s++) {
    dp[s] = new Array(m+1);
    for (let carry = 0; carry <= m; carry++) dp[s][carry] = new Array(m+1).fill(0n);
  }
  dp[0][0][0] = 1n;
  for (let i = 0; i < n; i++) {
    let ndp = new Array(m+1);
    for (let s = 0; s <= m; s++) {
      ndp[s] = new Array(m+1);
      for (let carry = 0; carry <= m; carry++) ndp[s][carry] = new Array(m+1).fill(0n);
    }
    for (let s = 0; s <= m; s++) {
      for (let carry = 0; carry <= m; carry++) {
        for (let ones = 0; ones <= m; ones++) {
          let cur = dp[s][carry][ones];
          if (cur === 0n) continue;
          let maxc = m - s;
          for (let c = 0; c <= maxc; c++) {
            let ns = s + c;
            let t = c + carry;
            let bit = t & 1;
            let nc = t >> 1;
            let nones = ones + bit;
            let add = cur * powNums[i][c] % MOD * invfact[c] % MOD;
            ndp[ns][nc][nones] += add;
            if (ndp[ns][nc][nones] >= MOD) ndp[ns][nc][nones] -= MOD;
          }
        }
      }
    }
    dp = ndp;
  }
  function popcount(x) {
    let c = 0;
    while (x > 0) {
      x &= x - 1;
      c++;
    }
    return c;
  }
  let ans = 0n;
  for (let carry = 0; carry <= m; carry++) {
    for (let ones = 0; ones <= m; ones++) {
      let cur = dp[m][carry][ones];
      if (cur === 0n) continue;
      let totalOnes = ones + popcount(carry);
      if (totalOnes === k) ans = (ans + cur) % MOD;
    }
  }
  ans = ans * fact[m] % MOD;
  return Number(ans);
}

var maxProfit = function (prices, strategy, k) {
  const n = prices.length;
  let base = 0;
  for (let i = 0; i < n; i++) {
    base += strategy[i] * prices[i];
  }

  const half = k / 2;
  const remove = new Array(n);
  const add = new Array(n);

  for (let i = 0; i < n; i++) {
    remove[i] = -strategy[i] * prices[i];
    add[i] = (1 - strategy[i]) * prices[i];
  }

  let leftSum = 0;
  let rightSum = 0;

  for (let i = 0; i < half; i++) {
    leftSum += remove[i];
  }
  for (let i = half; i < k; i++) {
    rightSum += add[i];
  }

  let best = leftSum + rightSum;

  for (let l = 1; l + k <= n; l++) {
    leftSum -= remove[l - 1];
    leftSum += remove[l + half - 1];

    rightSum -= add[l + half - 1];
    rightSum += add[l + k - 1];

    best = Math.max(best, leftSum + rightSum);
  }

  return base + Math.max(0, best);
};

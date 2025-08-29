function flowerGame(n, m) {
  const oddN = Math.floor((n + 1) / 2);
  const evenN = Math.floor(n / 2);
  const oddM = Math.floor((m + 1) / 2);
  const evenM = Math.floor(m / 2);
  return oddN * evenM + evenN * oddM;
}


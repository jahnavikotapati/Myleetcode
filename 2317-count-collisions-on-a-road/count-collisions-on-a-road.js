function countCollisions(directions) {
  const n = directions.length;
  let i = 0, j = n - 1;
  while (i < n && directions[i] === 'L') i++;
  while (j >= 0 && directions[j] === 'R') j--;
  let collisions = 0;
  for (let k = i; k <= j; k++) if (directions[k] !== 'S') collisions++;
  return collisions;
}

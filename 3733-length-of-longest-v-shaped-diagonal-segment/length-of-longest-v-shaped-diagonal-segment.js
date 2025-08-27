var lenOfVDiagonal = function(grid) {
  const n = grid.length, m = grid[0].length;

  // Diagonal directions: 0:↘, 1:↖, 2:↗, 3:↙
  const dirs = [
    [1, 1],   // ↘
    [-1, -1], // ↖
    [-1, 1],  // ↗
    [1, -1],  // ↙
  ];

  // Clockwise 90° turn mapping on row-down coordinates
  // ↘→↙, ↙→↖, ↖→↗, ↗→↘
  const turnCW = [3, 2, 0, 1];

  // Helpers to create 3D arrays
  const mk3 = () => Array.from({ length: 4 }, () =>
    Array.from({ length: n }, () => new Array(m).fill(0))
  );

  const end = mk3();     // end[d][i][j]
  const start2 = mk3();  // start2[d][i][j]
  const start0 = mk3();  // start0[d][i][j]

  let ans = 0;

  // 1) DP for sequences ENDING at (i,j) in direction d
  for (let d = 0; d < 4; d++) {
    const [dx, dy] = dirs[d];
    const rows = dx === 1 ? [...Array(n).keys()] : [...Array(n).keys()].reverse();
    const cols = dy === 1 ? [...Array(m).keys()] : [...Array(m).keys()].reverse();

    for (const i of rows) {
      for (const j of cols) {
        // Base: can start at a 1
        if (grid[i][j] === 1) end[d][i][j] = 1;

        const pi = i - dx, pj = j - dy;
        if (pi >= 0 && pi < n && pj >= 0 && pj < m) {
          const prev = end[d][pi][pj];
          if (prev > 0) {
            const expected = (prev % 2 === 1) ? 2 : 0; // after length prev
            if (grid[i][j] === expected) {
              end[d][i][j] = Math.max(end[d][i][j], prev + 1);
            }
          }
        }
        if (end[d][i][j] > ans) ans = end[d][i][j]; // straight segment (no turn)
      }
    }
  }

  // 2) DP for sequences STARTING at (i,j) in direction d
  // start2/start0 alternate: 2->0->2..., 0->2->0...
  for (let d = 0; d < 4; d++) {
    const [dx, dy] = dirs[d];
    const rows = dx === 1 ? [...Array(n).keys()].reverse() : [...Array(n).keys()];
    const cols = dy === 1 ? [...Array(m).keys()].reverse() : [...Array(m).keys()];

    for (const i of rows) {
      for (const j of cols) {
        const ni = i + dx, nj = j + dy;
        const next0 = (ni >= 0 && ni < n && nj >= 0 && nj < m) ? start0[d][ni][nj] : 0;
        const next2 = (ni >= 0 && ni < n && nj >= 0 && nj < m) ? start2[d][ni][nj] : 0;

        start2[d][i][j] = (grid[i][j] === 2) ? 1 + next0 : 0;
        start0[d][i][j] = (grid[i][j] === 0) ? 1 + next2 : 0;
      }
    }
  }

  // 3) Try a single clockwise turn at every cell
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      for (let d = 0; d < 4; d++) {
        const L = end[d][i][j];
        if (L === 0) continue;

        const nd = turnCW[d];
        const [dx2, dy2] = dirs[nd];
        const ni = i + dx2, nj = j + dy2;
        if (ni < 0 || ni >= n || nj < 0 || nj >= m) continue;

        const expectedNext = (L % 2 === 1) ? 2 : 0;
        const cont = expectedNext === 2 ? start2[nd][ni][nj] : start0[nd][ni][nj];

        // total = left part (ending at i,j) + continuation starting at (ni,nj)
        if (L + cont > ans) ans = L + cont;
      }
    }
  }

  return ans;
};

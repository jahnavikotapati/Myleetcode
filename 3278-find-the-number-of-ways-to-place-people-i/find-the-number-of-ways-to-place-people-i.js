var numberOfPairs = function(points) {
  const n = points.length;
  let count = 0;

  for (let i = 0; i < n; i++) {
    const [x1, y1] = points[i];
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      const [x2, y2] = points[j];

      // A must be on the upper-left of B (allow equality → line cases)
      if (x1 <= x2 && y1 >= y2) {
        let valid = true;

        for (let k = 0; k < n && valid; k++) {
          if (k === i || k === j) continue;
          const [x, y] = points[k];

          // check if (x,y) lies inside or on the rectangle formed by A & B
          if (x1 <= x && x <= x2 && y2 <= y && y <= y1) {
            valid = false;
          }
        }

        if (valid) count++;
      }
    }
  }
  return count;
};

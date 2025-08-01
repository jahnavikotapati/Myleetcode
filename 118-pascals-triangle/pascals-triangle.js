function generate(numRows) {
  const result = [];

  for (let i = 0; i < numRows; i++) {
    const row = [1];
    for (let j = 1; j < i; j++) {
      row[j] = result[i - 1][j - 1] + result[i - 1][j];
    }
    if (i > 0) row.push(1);
    result.push(row);
  }
  return result;
}

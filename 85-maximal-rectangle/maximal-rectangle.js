var maximalRectangle = function(matrix) {
    if (!matrix.length) return 0;
    const rows = matrix.length, cols = matrix[0].length;
    const heights = Array(cols).fill(0);
    let maxArea = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            heights[j] = matrix[i][j] === '1' ? heights[j] + 1 : 0;
        }

        let stack = [];
        for (let k = 0; k <= cols; k++) {
            let h = k === cols ? 0 : heights[k];
            while (stack.length && h < heights[stack[stack.length - 1]]) {
                let height = heights[stack.pop()];
                let width = stack.length ? k - stack[stack.length - 1] - 1 : k;
                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(k);
        }
    }

    return maxArea;
};

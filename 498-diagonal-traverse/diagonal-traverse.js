var findDiagonalOrder = function(mat) {
    let m = mat.length;
    let n = mat[0].length;
    let result = [];
    
    let row = 0, col = 0;
    let direction = 1; 
    
    while (result.length < m * n) {
        result.push(mat[row][col]);
        
        if (direction === 1) { 
            if (col === n - 1) { 
                row++;
                direction = -1;
            } else if (row === 0) { 
                col++;
                direction = -1;
            } else { 
                row--;
                col++;
            }
        } else { 
            if (row === m - 1) { 
                col++;
                direction = 1;
            } else if (col === 0) { 
                row++;
                direction = 1;
            } else { 
                row++;
                col--;
            }
        }
    }
    
    return result;
};

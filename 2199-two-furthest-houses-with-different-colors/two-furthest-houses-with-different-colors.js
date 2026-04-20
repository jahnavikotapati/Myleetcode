var maxDistance = function(colors) {
    let n = colors.length;
    
    let maxDist = 0;
    
    // Compare with first house
    for (let j = n - 1; j >= 0; j--) {
        if (colors[j] !== colors[0]) {
            maxDist = j; // distance = j - 0
            break;
        }
    }
    
    // Compare with last house
    for (let i = 0; i < n; i++) {
        if (colors[i] !== colors[n - 1]) {
            maxDist = Math.max(maxDist, n - 1 - i);
            break;
        }
    }
    
    return maxDist;
};var maxDistance = function(colors) {
    let n = colors.length;
    
    let maxDist = 0;
    
    // Compare with first house
    for (let j = n - 1; j >= 0; j--) {
        if (colors[j] !== colors[0]) {
            maxDist = j; // distance = j - 0
            break;
        }
    }
    
    // Compare with last house
    for (let i = 0; i < n; i++) {
        if (colors[i] !== colors[n - 1]) {
            maxDist = Math.max(maxDist, n - 1 - i);
            break;
        }
    }
    
    return maxDist;
};
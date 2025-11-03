var minCost = function(colors, neededTime) {
    let totalTime = 0;
    let maxTimeInGroup = neededTime[0];
    for (let i = 1; i < colors.length; i++) {
        if (colors[i] === colors[i - 1]) {
            totalTime += Math.min(maxTimeInGroup, neededTime[i]);
            maxTimeInGroup = Math.max(maxTimeInGroup, neededTime[i]);
        } else {
            maxTimeInGroup = neededTime[i];
        }
    }
    return totalTime;
};

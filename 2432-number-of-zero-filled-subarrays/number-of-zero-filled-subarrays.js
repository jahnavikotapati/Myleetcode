var zeroFilledSubarray = function(nums) {
    let count = 0;  
    let streak = 0;  
    for (let num of nums) {
        if (num === 0) {
            streak += 1;
            count += streak;  
        } else {
            streak = 0; 
        }
    }

    return count;
};

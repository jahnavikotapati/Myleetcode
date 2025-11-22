var minimumOperations = function(nums) {
    let ops = 0;
    for (let x of nums) {
        let r = x % 3;
        if (r === 1) ops += 1;
        else if (r === 2) ops += 1;
    }
    return ops;
};

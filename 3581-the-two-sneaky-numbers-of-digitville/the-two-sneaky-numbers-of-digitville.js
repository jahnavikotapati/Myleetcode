var getSneakyNumbers = function(nums) {
    let seen = new Set(), res = [];
    for (let n of nums) {
        if (seen.has(n)) res.push(n);
        else seen.add(n);
    }
    return res;
};

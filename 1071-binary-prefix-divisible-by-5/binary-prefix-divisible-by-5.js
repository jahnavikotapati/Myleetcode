var prefixesDivBy5 = function(nums) {
    let res = [];
    let cur = 0; 
    for (let b of nums) {
        cur = (cur * 2 + b) % 5;
        res.push(cur === 0);
    }
    
    return res;
};

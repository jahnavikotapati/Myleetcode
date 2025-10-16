var findSmallestInteger = function(nums, value) {
    let count = new Array(value).fill(0);
    for (let num of nums) {
        let mod = ((num % value) + value) % value;
        count[mod]++;
    }

    let mex = 0;
    while (true) {
        let mod = mex % value;
        if (count[mod] === 0) break;
        count[mod]--;
        mex++;
    }

    return mex;
};
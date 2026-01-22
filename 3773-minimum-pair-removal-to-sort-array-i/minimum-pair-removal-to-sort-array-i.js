var minimumPairRemoval = function(nums) {
    const isSorted = arr => {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) return false;
        }
        return true;
    };

    let ops = 0;

    while (!isSorted(nums)) {
        let minSum = Infinity;
        let idx = 0;

        for (let i = 0; i < nums.length - 1; i++) {
            let s = nums[i] + nums[i + 1];
            if (s < minSum) {
                minSum = s;
                idx = i;
            }
        }

        nums.splice(idx, 2, minSum);
        ops++;
    }

    return ops;
};

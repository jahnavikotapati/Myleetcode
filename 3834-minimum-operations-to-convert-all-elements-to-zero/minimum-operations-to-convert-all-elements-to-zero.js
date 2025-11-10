var minOperations = function(nums) {
    let res = 0, n = nums.length, i = 0;
    while (i < n) {
        if (nums[i] === 0) { i++; continue; }
        let stack = [];
        while (i < n && nums[i] !== 0) {
            let x = nums[i];
            while (stack.length && stack[stack.length - 1] > x) stack.pop();
            if (x !== 0 && (stack.length === 0 || stack[stack.length - 1] < x)) {
                stack.push(x);
                res++;
            }
            i++;
        }
    }
    return res;
};

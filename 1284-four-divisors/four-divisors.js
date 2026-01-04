var sumFourDivisors = function(nums) {
    let res = 0;
    for (let x of nums) {
        let d1 = -1, d2 = -1;
        for (let i = 2; i * i <= x; i++) {
            if (x % i === 0) {
                let j = x / i;
                if (d1 === -1) {
                    d1 = i;
                    d2 = j;
                } else {
                    d1 = -2;
                    break;
                }
            }
        }
        if (d1 >= 2 && d1 !== d2) {
            res += 1 + d1 + d2 + x;
        }
    }
    return res;
};

/**
 * @param {number} side
 * @param {number[][]} points
 * @param {number} k
 * @return {number}
 */
var maxDistance = function(side, points, k) {
    let res = points.map(([x, y]) => {
        if (x === 0) 
            return y;
        if (y === side) 
            return side + x;
        if (x === side) 
            return side * 3 - y;
        return side * 4 - x;
    }).sort((a, b) => a - b);

    const perimeter = side * 4;

    const binarySearch = (arr, target) => {
        let l = 0, r = arr.length;
        while (l < r) {
            let mid = Math.floor((l + r) / 2);
            if (arr[mid] < target) 
                l = mid + 1;
            else r = mid;
        }
        return l;
    };

    const check = (n) => {
        let m = res.length;
        let idx = new Array(k).fill(0);
        let curr = res[0];
        for (let i = 1; i < k; i++) {
            let j = binarySearch(res, curr + n);
            if (j === m) 
                return false;
            idx[i] = j;
            curr = res[j];
        }
        if (res[idx[k - 1]] - res[0] <= perimeter - n) 
            return true;

        for (idx[0] = 1; idx[0] < idx[1]; idx[0]++) {
            for (let j = 1; j < k; j++) {
                while (idx[j] < m && res[idx[j]] < res[idx[j - 1]] + n) {
                    idx[j]++;
                }
                if (idx[j] === m) 
                    return false;
            }
            if (res[idx[k - 1]] - res[idx[0]] <= perimeter - n) 
                return true;
        }
        return false;
    };

    let left = 1, right = Math.floor(perimeter / k) + 1;
    while (left + 1 < right) {
        let mid = Math.floor((left + right) / 2);
        if (check(mid)) 
            left = mid;
        else right = mid;
    }
    return left;
};
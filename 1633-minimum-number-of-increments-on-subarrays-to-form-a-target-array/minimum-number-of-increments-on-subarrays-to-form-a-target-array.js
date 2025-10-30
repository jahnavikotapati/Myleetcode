var minNumberOperations = function(target) {
    let res = target[0];
    for (let i = 1; i < target.length; i++) {
        if (target[i] > target[i - 1]) res += target[i] - target[i - 1];
    }
    return res;
};

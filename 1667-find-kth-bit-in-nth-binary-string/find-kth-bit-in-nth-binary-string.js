var findKthBit = function(n, k) {
    if (n === 1) return "0";

    let mid = 1 << (n - 1);

    if (k === mid) return "1";
    if (k < mid) return findKthBit(n - 1, k);

    let res = findKthBit(n - 1, (1 << n) - k);
    return res === "0" ? "1" : "0";
};
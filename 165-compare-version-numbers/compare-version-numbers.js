var compareVersion = function(version1, version2) {
    let v1 = version1.split('.').map(Number);
    let v2 = version2.split('.').map(Number);
    let n = Math.max(v1.length, v2.length);
    for (let i = 0; i < n; i++) {
        let num1 = v1[i] || 0;
        let num2 = v2[i] || 0;
        if (num1 > num2) return 1;
        if (num1 < num2) return -1;
    }
    return 0;
};

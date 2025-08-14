/**
 * @param {string} num
 * @return {string}
 */
var largestGoodInteger = function(num) {
    let maxGood = "";

    for (let i = 0; i <= num.length - 3; i++) {
        let sub = num.slice(i, i + 3);
        if (sub[0] === sub[1] && sub[1] === sub[2]) {
            if (sub > maxGood) {
                maxGood = sub;
            }
        }
    }
    return maxGood;
};
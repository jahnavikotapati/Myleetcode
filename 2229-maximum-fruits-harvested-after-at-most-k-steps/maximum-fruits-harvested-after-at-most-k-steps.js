function maxTotalFruits(fruits, startPos, k) {
    let left = 0;
    let total = 0;
    let maxFruits = 0;

    for (let right = 0; right < fruits.length; right++) {
        total += fruits[right][1];
        while (left <= right && !isWithinSteps(fruits, left, right, startPos, k)) {
            total -= fruits[left][1];
            left++;
        }
        maxFruits = Math.max(maxFruits, total);
    }
    return maxFruits;
}
function isWithinSteps(fruits, left, right, startPos, k) {
    const leftPos = fruits[left][0];
    const rightPos = fruits[right][0];
    const steps = (rightPos - leftPos) + Math.min(
        Math.abs(startPos - leftPos),
        Math.abs(startPos - rightPos)
    );
    return steps <= k;
}

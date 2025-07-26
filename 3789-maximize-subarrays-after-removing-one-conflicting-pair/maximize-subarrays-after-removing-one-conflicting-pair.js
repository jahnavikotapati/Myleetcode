/**
 * @param {number} n
 * @param {number[][]} conflictingPairs
 * @return {number}
 */
var maxSubarrays = function(n, conflictingPairs) {
  
    const k = conflictingPairs.length;
    if (n <= 0) return 0;
    if (k === 0) return n * (n + 1) / 2;
    const NO_BLOCKER = n;
    const eventsByLo = Array.from({ length: n + 1 }, () => []);
    for (let pid = 0; pid < k; pid++) {
        const [a, b] = conflictingPairs[pid];
        const lo = Math.min(a, b);
        const hiMinusOne = Math.max(a, b) - 1;
        eventsByLo[lo].push([hiMinusOne, pid]);
    }
    let totalNoRemoval = 0; 
    const sumNearest = Array(k).fill(0);
    const sumSecond  = Array(k).fill(0);
    let nearest        = [NO_BLOCKER, -1];
    let secondNearest  = [NO_BLOCKER, -1];
    function activateBlocker(val, pid) {
        if (val < nearest[0]) {
            secondNearest = nearest;
            nearest       = [val, pid];
        } else if (val < secondNearest[0]) {
            secondNearest = [val, pid];
        }
    }
    for (let i = n; i >= 1; i--) {
        const list = eventsByLo[i];
        for (let idx = 0; idx < list.length; idx++) {
            const [hi1, pid] = list[idx];
            activateBlocker(hi1, pid);
        }
        const f0   = (nearest[1] >= 0 ? nearest[0] : NO_BLOCKER);
        const pid0 = nearest[1];
        const s0   = (secondNearest[1] >= 0 ? secondNearest[0] : NO_BLOCKER);
        totalNoRemoval += (f0 - i + 1);
        if (pid0 >= 0) {
            sumNearest[pid0] += f0;
            sumSecond[pid0]  += s0;
        }
    }
    let bestGain = 0;
    for (let pid = 0; pid < k; pid++) {
        const gain = sumSecond[pid] - sumNearest[pid];
        if (gain > bestGain) bestGain = gain;
    }
    return totalNoRemoval + bestGain;
};
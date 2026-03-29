var canBeEqual = function(s1, s2) {
    const a1 = [s1[0], s1[2]].sort().join('');
    const a2 = [s2[0], s2[2]].sort().join('');
    const b1 = [s1[1], s1[3]].sort().join('');
    const b2 = [s2[1], s2[3]].sort().join('');
    return a1 === a2 && b1 === b2;
};
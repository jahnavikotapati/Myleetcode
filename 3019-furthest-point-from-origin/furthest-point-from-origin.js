var furthestDistanceFromOrigin = function(moves) {
    let L = 0, R = 0, blanks = 0;

    for (let ch of moves) {
        if (ch === 'L') L++;
        else if (ch === 'R') R++;
        else blanks++;
    }

    return Math.abs(L - R) + blanks;
};
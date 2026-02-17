var readBinaryWatch = function(turnedOn) {
    const res = [];
    for (let h = 0; h < 12; h++) {
        for (let m = 0; m < 60; m++) {
            if ((h.toString(2) + m.toString(2)).split('0').join('').length === turnedOn) {
                res.push(h + ':' + (m < 10 ? '0' + m : m));
            }
        }
    }
    return res;
};

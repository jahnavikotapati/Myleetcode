var numberOfBeams = function(bank) {
    let prev = 0, result = 0;
    for (let row of bank) {
        let count = [...row].filter(c => c === '1').length;
        if (count > 0) {
            result += prev * count;
            prev = count;
        }
    }
    return result;
};

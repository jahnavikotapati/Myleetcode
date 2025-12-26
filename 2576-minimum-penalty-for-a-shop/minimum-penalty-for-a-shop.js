var bestClosingTime = function(customers) {
    let penalty = 0;
    for (let c of customers) if (c === 'Y') penalty++;
    let minPenalty = penalty;
    let best = 0;
    for (let i = 0; i < customers.length; i++) {
        if (customers[i] === 'Y') penalty--;
        else penalty++;
        if (penalty < minPenalty) {
            minPenalty = penalty;
            best = i + 1;
        }
    }
    return best;
};

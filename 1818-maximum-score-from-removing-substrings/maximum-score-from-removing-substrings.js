function maximumGain(s, x, y) {
    const removePair = (s, a, b, score) => {
        const stack = [];
        let total = 0;

        for (let char of s) {
            if (stack.length && stack[stack.length - 1] === a && char === b) {
                stack.pop(); 
                total += score;
            } else {
                stack.push(char);
            }
        }

        return [stack.join(''), total];
    };

    let totalScore = 0;

    
    if (x > y) {
        
        [s, gained] = removePair(s, 'a', 'b', x);
        totalScore += gained;

        
        [s, gained] = removePair(s, 'b', 'a', y);
        totalScore += gained;
    } else {
        
        [s, gained] = removePair(s, 'b', 'a', y);
        totalScore += gained;

        
        [s, gained] = removePair(s, 'a', 'b', x);
        totalScore += gained;
    }

    return totalScore;
}

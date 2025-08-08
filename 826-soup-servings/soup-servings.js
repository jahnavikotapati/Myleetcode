function soupServings(n) {
    if (n >= 4800) return 1.0;

    const memo = new Map();

    function dp(a, b) {
        if (a <= 0 && b <= 0) return 0.5; 
        if (a <= 0) return 1.0; 
        if (b <= 0) return 0.0;      

        const key = `${a},${b}`;
        if (memo.has(key)) return memo.get(key);

        const prob = 0.25 * (
            dp(a - 4, b) +      
            dp(a - 3, b - 1) +  
            dp(a - 2, b - 2) +  
            dp(a - 1, b - 3)    
        );

        memo.set(key, prob);
        return prob;
    }

    const scaledN = Math.ceil(n / 25);
    return dp(scaledN, scaledN);
}

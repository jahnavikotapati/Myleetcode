var getHappyString = function(n, k) {
    const res = [];
    
    const dfs = (str) => {
        if (str.length === n) {
            res.push(str);
            return;
        }
        
        for (let ch of ['a','b','c']) {
            if (str.length === 0 || str[str.length-1] !== ch) {
                dfs(str + ch);
            }
        }
    };
    
    dfs("");
    
    return res[k-1] || "";
};
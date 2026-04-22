var twoEditWords = function(queries, dictionary) {
    
    function isValid(q, d) {
        let diff = 0;
        
        for (let i = 0; i < q.length; i++) {
            if (q[i] !== d[i]) {
                diff++;
                if (diff > 2) return false; // early stop
            }
        }
        
        return true;
    }
    
    let result = [];
    
    for (let q of queries) {
        for (let d of dictionary) {
            if (isValid(q, d)) {
                result.push(q);
                break; // no need to check more
            }
        }
    }
    
    return result;
};
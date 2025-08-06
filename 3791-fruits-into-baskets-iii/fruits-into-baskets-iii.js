var numOfUnplacedFruits = function (fruits, baskets) {
    const n = baskets.length;
    const blockSize = Math.floor(Math.sqrt(n));
    const numBlocks = Math.ceil(n / blockSize);
    const maxInBlock = new Array(numBlocks).fill(0);
    for (let i = 0; i < n; i++) {
        const block = Math.floor(i / blockSize);
        maxInBlock[block] = Math.max(maxInBlock[block], baskets[i]);
    }
    let unplacedCount = 0;
    for (const fruit of fruits) {
        let placed = false;
        for (let block = 0; block < numBlocks; block++) {
            if (maxInBlock[block] < fruit) continue;
            maxInBlock[block] = 0; 
            for (let i = 0; i < blockSize; i++) {
                const index = block * blockSize + i;
                if (index >= n) break;
                if (!placed && baskets[index] >= fruit) {
                    baskets[index] = 0; 
                    placed = true;
                }
                maxInBlock[block] = Math.max(maxInBlock[block], baskets[index]);
            }
            if (placed) break; 
        }

        if (!placed) unplacedCount++;
    }

    return unplacedCount;
};

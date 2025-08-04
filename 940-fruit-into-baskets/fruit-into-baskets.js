var totalFruit = function(fruits) {
    let basket = new Map();
    let start = 0;
    let maxFruits = 0;

    for (let end = 0; end < fruits.length; end++) {
        const fruit = fruits[end];
        basket.set(fruit, (basket.get(fruit) || 0) + 1);
        while (basket.size > 2) {
            const startFruit = fruits[start];
            basket.set(startFruit, basket.get(startFruit) - 1);
            if (basket.get(startFruit) === 0) {
                basket.delete(startFruit);
            }
            start++;
        }

        maxFruits = Math.max(maxFruits, end - start + 1);
    }

    return maxFruits;
};

var successfulPairs = function(spells, potions, success) {
    potions.sort((a, b) => a - b)
    let res = []
    for (let spell of spells) {
        let left = 0, right = potions.length - 1
        while (left <= right) {
            let mid = Math.floor((left + right) / 2)
            if (BigInt(spell) * BigInt(potions[mid]) >= BigInt(success)) right = mid - 1
            else left = mid + 1
        }
        res.push(potions.length - left)
    }
    return res
}

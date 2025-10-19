var findLexSmallestString = function(s, a, b) {
    const seen = new Set()
    let res = s
    const q = [s]
    const add = str => {
        let arr = str.split('')
        for (let i = 1; i < arr.length; i += 2)
            arr[i] = ((+arr[i] + a) % 10).toString()
        return arr.join('')
    }
    const rotate = str => str.slice(-b) + str.slice(0, -b)
    while (q.length) {
        let cur = q.shift()
        if (seen.has(cur)) continue
        seen.add(cur)
        if (cur < res) res = cur
        let s1 = add(cur)
        let s2 = rotate(cur)
        if (!seen.has(s1)) q.push(s1)
        if (!seen.has(s2)) q.push(s2)
    }
    return res
}

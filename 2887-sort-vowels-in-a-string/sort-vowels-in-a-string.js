var sortVowels = function(s) {
    const vowels = new Set(['a','e','i','o','u','A','E','I','O','U']);
    const vowelArray = [];
    for (let ch of s) if (vowels.has(ch)) vowelArray.push(ch);
    vowelArray.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
    let result = '';
    let idx = 0;
    for (let ch of s) {
        result += vowels.has(ch) ? vowelArray[idx++] : ch;
    }
    return result;
};
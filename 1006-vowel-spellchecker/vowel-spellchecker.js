/**
 * @param {string[]} wordlist
 * @param {string[]} queries
 * @return {string[]}
 */
var spellchecker = function(wordlist, queries) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);

    // Helper function to mask vowels in a word (case-insensitive)
    function maskVowels(word) {
        return word.toLowerCase().replace(/[aeiou]/g, '*');
    }

    // Step 1: Build dictionaries for quick lookup
    const exactWords = new Set(wordlist); // for exact match
    const caseInsensitiveMap = new Map(); // lowercase -> first occurrence
    const vowelMaskMap = new Map(); // vowel-masked -> first occurrence

    for (let word of wordlist) {
        let lower = word.toLowerCase();
        let masked = maskVowels(word);

        if (!caseInsensitiveMap.has(lower)) {
            caseInsensitiveMap.set(lower, word);
        }
        if (!vowelMaskMap.has(masked)) {
            vowelMaskMap.set(masked, word);
        }
    }

    // Step 2: Process queries
    const result = [];
    for (let query of queries) {
        if (exactWords.has(query)) {
            // Rule 1: exact match
            result.push(query);
        } else if (caseInsensitiveMap.has(query.toLowerCase())) {
            // Rule 2: capitalization match
            result.push(caseInsensitiveMap.get(query.toLowerCase()));
        } else if (vowelMaskMap.has(maskVowels(query))) {
            // Rule 3: vowel error match
            result.push(vowelMaskMap.get(maskVowels(query)));
        } else {
            // No match
            result.push("");
        }
    }

    return result;
};


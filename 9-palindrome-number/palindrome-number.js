function isPalindrome(x) {
    
    if (x < 0) return false;

    
    const str = x.toString();

    
    const reversedStr = str.split('').reverse().join('');
    
    return str === reversedStr;
}

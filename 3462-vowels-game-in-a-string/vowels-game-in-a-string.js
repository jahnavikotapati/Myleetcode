function doesAliceWin(s) {
  for (let ch of s) {
    if ("aeiou".includes(ch)) return true;
  }
  return false;
}
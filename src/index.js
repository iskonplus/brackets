module.exports = function check(str, bracketsConfig) {
  let a = 0;

  for (let i = 0; i < str.length; i++) {
    (str[i]) === ")" && (a-=1);
    (str[i]) === "]" && (a-=1);
    (str[i]) === "}" && (a-=1);
    (str[i]) === "(" && (a += 1);
    (str[i]) === "[" && (a += 1);
    (str[i]) === "{" && (a += 1);
    if (a < 0) { return !a } 
      if (a < 0) { return !a } 
  }
  return !a    
}

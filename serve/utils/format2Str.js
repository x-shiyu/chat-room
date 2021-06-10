module.exports = function format2Str(str1, str2) {
  if (str1.length > str2.length) {
    return str1 + str2;
  } else if (str1.length < str2.length) {
    return str2 + str1;
  } else {
    for (let i = 0; i < str1.length; i++) {
      if (str1.codePointAt(i) > str2.codePointAt(i)) {
        return str1 + str2;
      } else if (str1.codePointAt(i) < str2.codePointAt(i)) {
        return str2 + str1;
      }
    }
  }
};

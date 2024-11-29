export const checkJongseong = (word) => {
  if (!word) return false;
  const lastChar = word[word.length - 1];
  const code = lastChar.charCodeAt(0);

  if (code < 0xAC00 || code > 0xD7A3) {
      return false; 
  }

  const jongseong = (code - 0xAC00) % 28;
  return jongseong !== 0;
};

export const getJongseong = (word, type) => {
  const hasJongseong = checkJongseong(word);
  
  switch(type) {
      case '은는':
      return hasJongseong ? "은" : "는";
    case "을를":
      return hasJongseong ? "이" : "가";
    case "으로":
      return hasJongseong ? "으로" : "로";
    default:
      return "";
  }
};
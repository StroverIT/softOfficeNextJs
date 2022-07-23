export function cyrylicToLatin(word) {
  const obj = {};
  let result = "";

  obj["а"] = "a";
  obj["б"] = "b";
  obj["в"] = "v";
  obj["г"] = "g";
  obj["д"] = "d";
  obj["е"] = "e";
  obj["ж"] = "j";
  obj["з"] = "z";
  obj["и"] = "i";
  obj["й"] = "ui";
  obj["к"] = "k";
  obj["л"] = "l";
  obj["м"] = "m";
  obj["н"] = "n";
  obj["о"] = "o";
  obj["п"] = "p";
  obj["р"] = "r";
  obj["с"] = "s";
  obj["т"] = "t";
  obj["у"] = "y";
  obj["ф"] = "f";
  obj["х"] = "h";
  obj["ц"] = "c";
  obj["ч"] = "ch";
  obj["ш"] = "sh";
  obj["щ"] = "sht";
  obj["ъ"] = "u";
  obj["ь"] = "ua";
  obj["ю"] = "yu";
  obj["я"] = "ia";

  for (let i = 0; i < word.length; i++) {
    let c = word.toLowerCase().charAt(i);
    let commonWord = c + word.toLowerCase().charAt(i + 1);
    if (obj[commonWord]) {
      c = commonWord;
      i += 1;
    }
    result += obj[c] || c;
  }
  return result;
}

export function latinToCyrylic(word) {
  const obj = {};
  let result = "";

  obj["a"] = "а";
  obj["b"] = "б";
  obj["v"] = "в";
  obj["g"] = "г";
  obj["d"] = "д";
  obj["e"] = "е";
  obj["j"] = "ж";
  obj["z"] = "з";
  obj["i"] = "и";
  obj["ui"] = "й";
  obj["k"] = "к";
  obj["l"] = "л";
  obj["m"] = "м";
  obj["n"] = "н";
  obj["o"] = "о";
  obj["p"] = "п";
  obj["r"] = "р";
  obj["s"] = "с";
  obj["t"] = "т";
  obj["y"] = "у";
  obj["f"] = "ф";
  obj["h"] = "х";
  obj["c"] = "ц";
  obj["ch"] = "ч";
  obj["sh"] = "ш";
  obj["sht"] = "щ";
  obj["u"] = "ъ";
  obj["ua"] = "ь";
  obj["yu"] = "ю";
  obj["ia"] = "я";

  for (let i = 0; i < word.length; i++) {
    let c = word.toLowerCase().charAt(i);
    let commonWord = c + word.toLowerCase().charAt(i + 1);
    if (obj[commonWord]) {
      c = commonWord;
      i += 1;
    }
    result += obj[c] || c;
  }
  return result;
}

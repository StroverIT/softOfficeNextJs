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
  obj["ь"] = "y";
  obj["ю"] = "yu";
  obj["я"] = "ia";

  for (let i = 0; i < word.length; i++) {
    let c = word.toLowerCase().charAt(i);
    result += obj[c] || c;
  }
  return result;
}

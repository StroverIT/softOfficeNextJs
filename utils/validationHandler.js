import XRegExp from "xregexp";

export const fullNameVal = (data) => {
  // const regex = new RegExp("^\\p{L}+\\s\\p{L}+$", "gm");
  const regex = XRegExp("^\\p{L}+\\s\\p{L}+$", "gm");

  return {
    result: regex.test(data),
    message: "Трябва да има две имена",
  };
};
export const diffPassVal = (first, second) => {
  return {
    result: !(first != second),
    message: "Паролите не съвпадат",
  };
};
export const isPositiveVal = (data) => {
  return {
    result: parseFloat(data) > 0,
    message: "The price should be a positive number",
  };
};
export const emailVal = (data) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return {
    result: re.test(data),
    message: "И-мейла трябва да бъде в правилен формат",
  };
};
export const isHttpVal = (data, message) => {
  var regex = new RegExp("^(http|https)://", "i");
  return {
    result: regex.test(data),
    message: `${message} must start with http:// or https://`,
  };
};
export const minLenVal = (data, minLen, input) => {
  return {
    result: !(data.length < minLen),
    message: `${input} must be atleast ${minLen} characters long `,
  };
};
export const equalLenVal = (data, equalLen, input) => {
  return {
    result: data != equalLen,
    message: `${input} must be exatcly ${equalLen} characters`,
  };
};
export const maxLenVal = (data, maxLen, input) => {
  return {
    result: !(data.length > maxLen),
    message: `${input} should be maximum of ${maxLen} characters long`,
  };
};

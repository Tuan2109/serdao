import {countryLengths} from './AddIBANScreen.constants';

const mod97 = (numericIban: string) => {
  let remainder = numericIban;
  while (remainder.length > 2) {
    const block = remainder.slice(0, 9);
    remainder = (parseInt(block, 10) % 97) + remainder.slice(block.length);
  }
  return parseInt(remainder, 10) % 97;
};

export const validateIBAN = (iban: string): boolean => {
  iban = iban.toUpperCase();
  const countryCode = iban.slice(0, 2) as string;
  if (
    !countryLengths[countryCode] ||
    iban.length !== countryLengths[countryCode]
  ) {
    return false;
  }
  const rearrangedIban = iban.slice(4) + iban.slice(0, 4);
  const numericIban = rearrangedIban.replace(
    /[A-Z]/g,
    char => String(char.charCodeAt(0) - 55),
  );
  const checksumValid = mod97(numericIban) === 1;
  return checksumValid;
};

export const checkIBANLengthValid = (iban: string) => {
  return iban.length >= 5 && iban.length <= 34;
};
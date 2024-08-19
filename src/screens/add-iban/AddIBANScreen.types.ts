export interface IBANInformationRefInterface {
  firstName: {
    value: string;
    isValid: boolean;
  };
  lastName: {
    value: string;
    isValid: boolean;
  };
  iban: {
    value: string;
    isValid: boolean;
  };
}

export enum ChecksumEnum {
  valid = 'valid',
  invalid = 'invalid',
  unknown = 'unknown',
}

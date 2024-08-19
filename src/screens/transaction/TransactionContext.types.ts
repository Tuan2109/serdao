export interface TransactionContextInterface {
  addTransaction: (amount: string, account: AccountInterface) => void;
  transactions: TransactionInterface[];
  balance: number;
  listIBAN: IBANInformationInterface[];
  addIBAN: (data: IBANInformationInterface) => void;
}

export interface AccountInterface {
  name: string;
  iban: string;
}

export interface TransactionInterface {
  id: number;
  amount: number;
  account: AccountInterface;
}

export interface IBANInformationInterface {
  firstName: string;
  lastName: string;
  iban: string;
}

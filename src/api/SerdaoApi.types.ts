import { AccountInterface, TransactionInterface } from "../screens/transaction/TransactionContext.types";

export interface IBANInformationInterface {
  firstName: string;
  lastName: string;
  iban: string;
}

export interface ResponseApiInterface {
  onSuccess?: (data: any) => void;
  onFailure?: (error: {errorMessage?: string; errorCode: number}) => void;
}

export interface RequestAddIBANInterface extends ResponseApiInterface {
  ibanInfo: IBANInformationInterface;
}

export interface RequestGetIBANInterface extends ResponseApiInterface {}

export interface CreateTransactionInterface extends ResponseApiInterface {
  newTransaction: TransactionInterface;
};

export interface GetTransactionInterface extends ResponseApiInterface {
};

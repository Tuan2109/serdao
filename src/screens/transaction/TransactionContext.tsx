import React, { createContext, useCallback, useEffect, useState } from 'react';
import {
  AccountInterface,
  IBANInformationInterface,
  TransactionContextInterface,
  TransactionInterface
} from './TransactionContext.types';
import * as SerdaoApi from '../../api/SerdaoApi';

const TransactionContext = createContext<TransactionContextInterface>({
  addTransaction: (amount: string, account: AccountInterface) => { },
  transactions: [],
  balance: 0,
  listIBAN: [],
  addIBAN: (data: IBANInformationInterface) => { },
});

export const useTransactions = (): TransactionContextInterface => React.useContext(TransactionContext);

export const TransactionProvider = ({ children }: any) => {
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [balance, setBalance] = useState<number>(1000);
  const [listIBAN, setListIBAN] = useState<IBANInformationInterface[]>([]);

  const addTransaction = useCallback((amount: string, account: AccountInterface) => {
    const newTransaction = { id: Date.now(), amount: parseFloat(amount), account };
    SerdaoApi.createTransaction({
      newTransaction,
      onSuccess(data: TransactionInterface) {
        setTransactions((prevTransactions) => [...prevTransactions, data]);
        setBalance((prevBalance) => prevBalance - parseFloat(amount));
      }
    });
  }, [SerdaoApi.createTransaction, setTransactions, setBalance]);

  const addIBAN = useCallback(async (data: IBANInformationInterface) => {
    setListIBAN((prevListIBAN) => [...prevListIBAN, data]);
  }, [setListIBAN]);

  const getListIBAN = useCallback(() => {
    SerdaoApi.getListIBAN({
      onSuccess(data: IBANInformationInterface[]) {
        setListIBAN(data);
      }
    })
  }, [SerdaoApi.getListIBAN, setListIBAN]);

  const getTransactionList = useCallback(() => {
    SerdaoApi.getTransactionList({
      onSuccess(data: TransactionInterface[]) {
        setTransactions(data);
      },
    })
  }, [SerdaoApi.getTransactionList, setTransactions]);

  useEffect(() => {
    getListIBAN();
    getTransactionList();
  }, [])

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        balance,
        listIBAN,
        addIBAN
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
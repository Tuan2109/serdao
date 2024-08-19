import AsyncStorage from '@react-native-async-storage/async-storage';
import type {
  CreateTransactionInterface,
  IBANInformationInterface,
  RequestAddIBANInterface,
} from './SerdaoApi.types';
import {safeGetArray} from '../core/lodash/LodashHelper';
import type {TransactionInterface} from '../screens/transaction/TransactionContext.types';

const IBAN_KEY = 'IBAN_LIST';
const TRANSACTION_KEY = 'TRANSACTION_LIST';

const getItem = async (
  key: string,
): Promise<{data: unknown; time: number} | null> => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    return null;
  }
};

const setItem = async (key: string, value: unknown): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(
      key,
      JSON.stringify({
        data: value,
        time: Date.now(),
      }),
    );
    return true;
  } catch (error) {
    return false;
  }
};

const processAddNewIBAN = async (
  request: RequestAddIBANInterface,
): Promise<boolean> => {
  const ibanStorage = await getItem(IBAN_KEY);
  const ibanList = safeGetArray(ibanStorage, 'data', []);
  return await setItem(IBAN_KEY, [...ibanList, request.ibanInfo]);
};

const processGetListIBAN = async (): Promise<IBANInformationInterface[]> => {
  const data = await getItem(IBAN_KEY);
  const ibanList = safeGetArray(data, 'data', []);
  return ibanList;
};

const processCreateTransaction = async (
  request: CreateTransactionInterface,
): Promise<TransactionInterface> => {
  const transactionListStorage = await getItem(TRANSACTION_KEY);
  const transactionList = safeGetArray(transactionListStorage, 'data', []);
  await setItem(TRANSACTION_KEY, [...transactionList, request.newTransaction]);
  return request.newTransaction;
};

const processGetTransaction = async (): Promise<IBANInformationInterface[]> => {
  const data = await getItem(TRANSACTION_KEY);
  console.log('thth vao day nha ', data)
  const transactionList = safeGetArray(data, 'data', []);
  return transactionList;
};

export const mockBE = {
  processAddNewIBAN,
  processGetListIBAN,
  processCreateTransaction,
  processGetTransaction,
};

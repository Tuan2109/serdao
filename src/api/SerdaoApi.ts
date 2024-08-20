import type {
  CreateTransactionInterface,
  GetTransactionInterface,
  RequestAddIBANInterface,
  RequestGetIBANInterface,
  ResponseApiInterface,
} from './SerdaoApi.types';
import {mockBE} from './SerdaoApi.mockBE';

const buildResponse = () => {};

export const addIBAN = async (
  params: RequestAddIBANInterface,
): Promise<void> => {
  const {onFailure, onSuccess} = params;
  try {
    const response = await mockBE.processAddNewIBAN(params);
    if (response) {
      onSuccess?.(params.ibanInfo);
      return;
    }
  } catch (err) {
    onFailure?.({errorCode: 40000, errorMessage: 'Timeout'});
    return;
  }
};

export const getListIBAN = async (
  params: RequestGetIBANInterface,
): Promise<void> => {
  const {onFailure, onSuccess} = params;
  try {
    const listIban = await mockBE.processGetListIBAN();
    onSuccess?.(listIban);
  } catch (error) {
    onFailure?.({errorCode: 40000, errorMessage: 'Timeout'});
  }
};

export const createTransaction = async (
  params: CreateTransactionInterface,
): Promise<void> => {
  const {onFailure, onSuccess} = params;
  try {
    const newTransaction = await mockBE.processCreateTransaction({
      newTransaction: params.newTransaction,
    });
    onSuccess?.(newTransaction);
  } catch (error) {
    onFailure?.({errorCode: 40000, errorMessage: 'Timeout'});
  }
};

export const getTransactionList = async (
  params: GetTransactionInterface,
): Promise<void> => {
  const {onFailure, onSuccess} = params;
  try {
    const newTransaction = await mockBE.processGetTransaction();
    onSuccess?.(newTransaction);
  } catch (error) {
    onFailure?.({errorCode: 40000, errorMessage: 'Timeout'});
  }
};

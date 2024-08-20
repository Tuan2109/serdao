import {useCallback, useMemo, useRef, useState} from 'react';
import {ChecksumEnum, IBANInformationRefInterface} from './AddIBANScreen.types';
import {SerdaoButtonTypeEnum} from '../../component/button/Button.types';
import {checkIBANLengthValid, validateIBAN} from './AddIBANScreen.helpers';
import {useTransactions} from '../transaction/TransactionContext';
import * as SerdaoApi from '../../api/SerdaoApi';
import {IBANInformationInterface} from '../transaction/TransactionContext.types';

export const useViewModel = ({ navigation }: any) => {
  const [isValid, setIsValid] = useState(false);
  const [ibanError, setIBANError] = useState<string>('');
  const [checksum, setChecksum] = useState<ChecksumEnum>(ChecksumEnum.unknown);
  const ibanInformationRef = useRef<IBANInformationRefInterface>({
    firstName: {
      value: '',
      isValid: false,
    },
    lastName: {
      value: '',
      isValid: false,
    },
    iban: {
      value: '',
      isValid: false,
    },
  });
  const {addIBAN} = useTransactions();

  const onChangeText = useCallback(
    (type: 'firstName' | 'lastName' | 'iban', value: string) => {
      ibanInformationRef.current[type].value = value;
    },
    [],
  );

  const validateAll = useCallback(() => {
    const firstName = ibanInformationRef.current.firstName.isValid;
    const lastName = ibanInformationRef.current.lastName.isValid;
    const iban = ibanInformationRef.current.iban.isValid;
    const isValidAllData = firstName && lastName && iban;
    setIsValid(isValidAllData);
    if (isValidAllData) {
      setChecksum(ChecksumEnum.unknown);
    }
  }, [setIsValid, setChecksum]);

  const onValidate = useCallback(
    (type: 'firstName' | 'lastName' | 'iban', isValid: boolean) => {
      if (type === 'iban') {
        if (
          isValid &&
          checkIBANLengthValid(ibanInformationRef.current.iban.value)
        ) {
          setIBANError('');
        } else {
          isValid = false;
          setIBANError('Invalid IBAN, ex: GB33BUKB20201555555555');
        }
      }
      ibanInformationRef.current[type].isValid = isValid;
      validateAll();
    },
    [setIBANError, validateAll],
  );

  const buttonType = useMemo(() => {
    return isValid && checksum !== ChecksumEnum.invalid
      ? SerdaoButtonTypeEnum.primary
      : SerdaoButtonTypeEnum.disabled;
  }, [isValid]);

  const onPress = useCallback(async () => {
    if (!validateIBAN(ibanInformationRef.current.iban.value)) {
      setChecksum(ChecksumEnum.invalid);
      return;
    }
    await SerdaoApi.addIBAN({
      ibanInfo: {
        iban: ibanInformationRef.current.iban.value,
        firstName: ibanInformationRef.current.firstName.value,
        lastName: ibanInformationRef.current.lastName.value,
      },
      onSuccess: (data: IBANInformationInterface) => {
        addIBAN({
          iban: data.iban,
          firstName: data.firstName,
          lastName: data.lastName,
        });
        navigation.goBack();
      },
    });
  }, []);

  return {
    selectors: {
      isValid,
      buttonType,
      checksum,
      ibanError,
      ibanInformationRef: ibanInformationRef.current
    },
    handlers: {
      onChangeText,
      onValidate,
      onPress,
      validateAll,
    },
  };
};

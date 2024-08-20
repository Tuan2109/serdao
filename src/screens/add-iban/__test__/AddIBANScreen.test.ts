/* eslint-disable @fs-mobile-platform/fs-mini-app/check-image-prefix */
import {act, renderHook} from '@testing-library/react-hooks';
import {useViewModel} from '../AddIBANScreen.viewModel';
import {ChecksumEnum} from '../AddIBANScreen.types';
import { validateIBAN } from '../AddIBANScreen.helpers';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('AddIBANScreen useViewModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('validateAll should return true when all valid', () => {
    const {result} = renderHook(() => useViewModel({}));
    act(() => {
      result.current.selectors.ibanInformationRef.firstName.isValid = true;
      result.current.selectors.ibanInformationRef.lastName.isValid = true;
      result.current.selectors.ibanInformationRef.iban.isValid = true;
      result.current.handlers.validateAll();
    });
    expect(result.current.selectors.isValid).toBe(true);
  });

  test('validateAll should return false when one of them invalid', () => {
    const {result} = renderHook(() => useViewModel({}));
    act(() => {
      result.current.selectors.ibanInformationRef.firstName.isValid = true;
      result.current.selectors.ibanInformationRef.lastName.isValid = true;
      result.current.selectors.ibanInformationRef.iban.isValid = false;
      result.current.handlers.validateAll();
    });
    expect(result.current.selectors.isValid).toBe(false);
  });

  test('onChangeText should be called with invalid IBAN', () => {
    const {result} = renderHook(() => useViewModel({}));
    const notEligibleIBAN = 'notEligible';
    act(() => {
      result.current.handlers.onChangeText('iban', notEligibleIBAN);
      result.current.handlers.onValidate('iban', false);
    });
    expect(result.current.selectors.ibanInformationRef.iban.isValid).toBe(
      false,
    );
    expect(result.current.selectors.ibanInformationRef.iban.value).toBe(
      notEligibleIBAN,
    );
  });

  test('onChangeText should be called with valid IBAN', () => {
    const {result} = renderHook(() => useViewModel({}));
    const eligibleIBAN = 'GB82WEST12345698765432';
    act(() => {
      result.current.handlers.onChangeText('iban', eligibleIBAN);
      result.current.handlers.onValidate('iban', true);
    });
    expect(result.current.selectors.ibanInformationRef.iban.isValid).toBe(true);
    expect(result.current.selectors.ibanInformationRef.iban.value).toBe(
      eligibleIBAN,
    );
  });

  test('onChangeText should be called with invalid first name', () => {
    const {result} = renderHook(() => useViewModel({}));
    const notEligibleFirstName = 'Fiiii 123';
    act(() => {
      result.current.handlers.onChangeText('firstName', notEligibleFirstName);
      result.current.handlers.onValidate('firstName', false);
    });
    expect(result.current.selectors.ibanInformationRef.firstName.isValid).toBe(
      false,
    );
    expect(result.current.selectors.ibanInformationRef.firstName.value).toBe(
      notEligibleFirstName,
    );
  });

  test('onChangeText should be called with valid IBAN', () => {
    const {result} = renderHook(() => useViewModel({}));
    const eligibleFirstName = 'Ryan';
    act(() => {
      result.current.handlers.onChangeText('firstName', eligibleFirstName);
      result.current.handlers.onValidate('firstName', true);
    });
    expect(result.current.selectors.ibanInformationRef.firstName.isValid).toBe(
      true,
    );
    expect(result.current.selectors.ibanInformationRef.firstName.value).toBe(
      eligibleFirstName,
    );
  });

  test('onChangeText should be called with invalid last name', () => {
    const {result} = renderHook(() => useViewModel({}));
    const notEligibleLastName = '456';
    act(() => {
      result.current.handlers.onChangeText('lastName', notEligibleLastName);
      result.current.handlers.onValidate('lastName', false);
    });
    expect(result.current.selectors.ibanInformationRef.lastName.isValid).toBe(
      false,
    );
    expect(result.current.selectors.ibanInformationRef.lastName.value).toBe(
      notEligibleLastName,
    );
  });

  test('onChangeText should be called with valid IBAN', () => {
    const {result} = renderHook(() => useViewModel({}));
    const eligibleLastName = 'Reynolds';
    act(() => {
      result.current.handlers.onChangeText('lastName', eligibleLastName);
      result.current.handlers.onValidate('lastName', true);
    });
    expect(result.current.selectors.ibanInformationRef.lastName.isValid).toBe(
      true,
    );
    expect(result.current.selectors.ibanInformationRef.lastName.value).toBe(
      eligibleLastName,
    );
  });
});

describe('AddIBANScreen helper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('validateIBAN should return true when valid iban', () => {
    const invalidIBAN = 'DE89370400440532013000';
    expect(validateIBAN(invalidIBAN)).toBe(true);
  });

  test('validateIBAN should return false when valid iban', () => {
    const invalidIBAN = 'INVALID_IBAN12345';
    expect(validateIBAN(invalidIBAN)).toBe(false);
  });

  test('fails validation for unsupported country code', () => {
    const invalidIBAN = 'XX89370400440532013000';
    expect(validateIBAN(invalidIBAN)).toBe(false);
  });

  test('fails validation for incorrect checksum', () => {
    const invalidIBAN = 'DE89370400440532013001';
    expect(validateIBAN(invalidIBAN)).toBe(false);
  });
});

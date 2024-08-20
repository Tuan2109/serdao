/* eslint-disable @fs-mobile-platform/fs-mini-app/check-image-prefix */
import {act, renderHook} from '@testing-library/react-hooks';
import {useViewModel} from '../Button.viewModel';
import {SerdaoButtonTypeEnum} from '../Button.types';
import {Colors} from '../../../core/Colors';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

const mockProps = {
  onPress: () => {},
  title: 'Click',
};

describe('AddIBANScreen useViewModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('backgroundColor should be return Colors.primary when type is default', () => {
    const backgroundColorExpected = Colors.primary;
    const {result} = renderHook(() => useViewModel({...mockProps}));
    expect(result.current.selectors.backgroundColor).toBe(
      backgroundColorExpected,
    );
  });

  test('backgroundColor should be return Colors.primary when type is primary', () => {
    const type = SerdaoButtonTypeEnum.primary;
    const backgroundColorExpected = Colors.primary;
    const {result} = renderHook(() => useViewModel({...mockProps, type}));
    expect(result.current.selectors.backgroundColor).toBe(
      backgroundColorExpected,
    );
  });

  test('backgroundColor should be return Colors.secondary when type is secondary', () => {
    const type = SerdaoButtonTypeEnum.secondary;
    const backgroundColorExpected = Colors.secondary;
    const {result} = renderHook(() => useViewModel({...mockProps, type}));
    expect(result.current.selectors.backgroundColor).toBe(
      backgroundColorExpected,
    );
  });

  test('backgroundColor should be return Colors.disabled when type is disabled', () => {
    const type = SerdaoButtonTypeEnum.disabled;
    const backgroundColorExpected = Colors.disabled;
    const {result} = renderHook(() => useViewModel({...mockProps, type}));
    expect(result.current.selectors.backgroundColor).toBe(
      backgroundColorExpected,
    );
  });

  test('isDisabled should be return true when type is disabled', () => {
    const type = SerdaoButtonTypeEnum.disabled;
    const {result} = renderHook(() => useViewModel({...mockProps, type}));
    expect(result.current.selectors.isDisabled).toBe(true);
  });

  test('isDisabled should be return false when type is not disabled', () => {
    const type = SerdaoButtonTypeEnum.primary;
    const {result} = renderHook(() => useViewModel({...mockProps, type}));
    expect(result.current.selectors.isDisabled).toBe(false);
  });
});

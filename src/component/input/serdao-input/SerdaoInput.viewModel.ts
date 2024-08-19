import {useCallback, useMemo, useState} from 'react';
import {SerdaoInputPropsInterface} from './SerdaoInput.types';

export const useViewModel = (props: SerdaoInputPropsInterface) => {
  const {
    style,
    messageError,
    hideMessageError = false,
    regex,
    onValidate,
    require = false,
  } = props;

  const [value, setValue] = useState<string>('');

  const isHiddenMessageError = useMemo(() => {
    return hideMessageError || !messageError;
  }, [hideMessageError, messageError]);

  const floatingLabel = useMemo(() => {
    if (props.floatingLabel) {
      return require ? `${props.floatingLabel}*` : props.floatingLabel;
    }
    return '';
  }, [props.floatingLabel]);

  const validateText = useCallback(
    (text: string = '') => {
      if (regex && text?.length > 0) {
        try {
          const test = new RegExp(regex);
          if (onValidate && typeof onValidate === 'function') {
            onValidate(test.test(text));
          }
        } catch (err) {
          //
        }
      }
    },
    [regex, onValidate],
  );

  const onChangeText = useCallback(
    (text: string = '') => {
      if (props?.autoCapitalize === 'characters') {
        text = text.toUpperCase();
      }
      props.onChangeText?.(text);
      validateText(text);
      setValue(text);
    },
    [props.onChangeText, validateText, setValue],
  );

  return {
    selectors: {
      floatingLabel,
      style,
      messageError,
      isHiddenMessageError,
      value,
    },
    handlers: {
      onChangeText,
    },
  };
};

import React, {useCallback, useMemo, useState} from 'react';
import {
  DefaultColorInterface,
  SerdaoButtonPropsInterface,
  SerdaoButtonTypeEnum,
} from './Button.types';
import {Colors} from '../../core/Colors';
import {Keyboard} from 'react-native';

export const useViewModel = (props: SerdaoButtonPropsInterface) => {
  const {type = SerdaoButtonTypeEnum.primary} = props;
  let isProcessing = false;
  const [loading, setLoading] = useState<boolean>(false);

  const backgroundColor = useMemo(() => {
    const backgroundColorDefault: DefaultColorInterface = {
      [SerdaoButtonTypeEnum.primary]: Colors.primary,
      [SerdaoButtonTypeEnum.secondary]: Colors.secondary,
      [SerdaoButtonTypeEnum.disabled]: Colors.disabled,
    };
    return backgroundColorDefault[type];
  }, [type]);

  const textColor = useMemo(() => {
    const backgroundColorDefault: DefaultColorInterface = {
      [SerdaoButtonTypeEnum.primary]: Colors.text_title,
      [SerdaoButtonTypeEnum.secondary]: Colors.secondary,
      [SerdaoButtonTypeEnum.disabled]: Colors.text_disabled,
    };
    return backgroundColorDefault[type];
  }, [type]);

  const isDisabled = useMemo(() => {
    return type === SerdaoButtonTypeEnum.disabled;
  }, [type]);

  const triggerActivateLoading = useCallback(() => {
    if (!!props.loading) {
      setLoading(true);
    }
  }, [setLoading, props.loading]);

  const triggerDeactivateLoading = useCallback(() => {
    if (!!props.loading) {
      setLoading(false);
    }
  }, [props.loading, setLoading]);

  const onPress = useCallback(async () => {
    Keyboard.dismiss();
    if (isProcessing) {
      return;
    }
    triggerActivateLoading();
    isProcessing = true;
    await props?.onPress();
    triggerDeactivateLoading();
    isProcessing = false;
  }, [triggerActivateLoading, props?.onPress, triggerDeactivateLoading]);

  return {
    selectors: {
      backgroundColor,
      textColor,
      isDisabled,
      loading,
    },
    handlers: {
      onPress,
    },
  };
};

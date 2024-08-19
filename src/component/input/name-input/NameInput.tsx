
import React, { useMemo } from 'react';
import { View, TextInput } from 'react-native';
import type { NameInputPropsInterface } from './NameInput.types';
import { SerdaoInput } from '../serdao-input/SerdaoInput';
import { useViewModel } from './NameInput.viewModel';
import { SerdaoRegex } from '../../../core/Constants';

export const NameInput = (props: NameInputPropsInterface) => {
    const { selectors, handlers } = useViewModel(props);

    return (
        <View>
            <SerdaoInput
                {...props}
                key={selectors.floatingLabel}
                floatingLabel={selectors.floatingLabel}
                placeholder={selectors.placeholder}
                autoCapitalize={'words'}
                regex={SerdaoRegex.name}
                onValidate={handlers.onValidate}
                messageError={selectors.error}
                onChangeText={handlers.onChangeText}
            />
        </View>
    );
}
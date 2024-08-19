import React, { useCallback } from 'react';
import { View, TextInput, Text } from 'react-native';
import { SerdaoInputPropsInterface } from './SerdaoInput.types';
import { styles } from './SerdaoInput.styles';
import { Colors } from '../../../core/Colors';
import { useViewModel } from './SerdaoInput.viewModel';

export const SerdaoInput = (props: SerdaoInputPropsInterface) => {
    const { selectors, handlers } = useViewModel(props);

    const renderFloatingLabel = useCallback(() => {
        if (selectors.floatingLabel) {
            return (
                <View style={styles.floatingLabel}>
                    <Text style={styles.floatingLabelText}>{selectors.floatingLabel}</Text>
                </View>
            )
        }
    }, [selectors.floatingLabel]);

    const renderMainInput = useCallback(() => {
        return (
            <TextInput
                {...props}
                style={{}}
                placeholderTextColor={Colors.text_placeholder}
                onChangeText={handlers.onChangeText}
                value={selectors.value}
            />
        );
    }, [props, handlers.onChangeText, selectors.value]);

    const renderErrorMessage = useCallback(() => {
        if (selectors.isHiddenMessageError) {
            return <></>;
        }
        return (
            <Text style={styles.messageError}>{selectors.messageError}</Text>
        )
    }, [selectors.messageError, selectors.isHiddenMessageError])

    return (
        <View style={[styles.container, selectors.style]}>
            <View style={[styles.wrap, !selectors.isHiddenMessageError && styles.wrapBorderError]}>
                {renderFloatingLabel()}
                {renderMainInput()}
            </View>
            {renderErrorMessage()}
        </View>
    );
}
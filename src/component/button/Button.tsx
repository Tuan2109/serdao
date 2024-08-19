import React from 'react';
import { ActivityIndicator, Button, Text, TouchableOpacity, View } from 'react-native';
import { SerdaoButtonPropsInterface } from './Button.types';
import { styles } from './Button.styles';
import { useViewModel } from './Button.viewModel';

export const SerdaoButton = (props: SerdaoButtonPropsInterface) => {
    const { title = '', style } = props;

    const { selectors, handlers } = useViewModel(props);

    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor: selectors.backgroundColor }, style]}
            disabled={selectors.isDisabled}
            onPress={handlers.onPress}
        >
            <Text style={[styles.title, { color: selectors.textColor }]}>{title}</Text>
            {
                selectors.loading && <ActivityIndicator size={'small'} color={selectors.textColor} style={styles.loading} />
            }
        </TouchableOpacity>
    );
}
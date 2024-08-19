import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { NameInput } from '../../component';
import { styles } from './AddIBANScreen.styles';
import { SerdaoButton } from '../../component/button/Button';
import { useViewModel } from './AddIBANScreen.viewModel';
import { SerdaoInput } from '../../component/input/serdao-input/SerdaoInput';
import { SerdaoRegex } from '../../core/Constants';
import { Utils } from '../../utils';

export const AddIBANScreen = (props: any) => {
    const { selectors, handlers } = useViewModel(props);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.wrap}>
                <Text style={styles.title}>{"Beneficiary"}</Text>
                <NameInput
                    require
                    positionName={'first'}
                    onChangeText={(value: string) => handlers.onChangeText('firstName', value)}
                    onValidate={(result: boolean) => handlers.onValidate('firstName', result)}
                />
                <NameInput
                    require
                    positionName={'last'}
                    onChangeText={(value: string) => handlers.onChangeText('lastName', value)}
                    onValidate={(result: boolean) => handlers.onValidate('lastName', result)}
                />
                <SerdaoInput
                    key={'iban-input'}
                    floatingLabel={'IBAN'}
                    placeholder={Utils.generateExample('GB33BUKB20201555555555')}
                    maxLength={34}
                    autoCapitalize={'characters'}
                    onChangeText={(value: string) => handlers.onChangeText('iban', value)}
                    messageError={selectors.ibanError}
                    hideMessageError={!selectors.ibanError}
                    regex={SerdaoRegex.IBAN}
                    onValidate={(result: boolean) => handlers.onValidate('iban', result)}
                />
                <SerdaoButton
                    title={'Confirm'}
                    type={selectors.buttonType}
                    onPress={handlers.onPress}
                    loading
                />
            </View>
        </ScrollView>
    );
}
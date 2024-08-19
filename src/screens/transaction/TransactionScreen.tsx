import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useTransactions } from './TransactionContext';
import { styles } from './TransactionScreen.styles';
import { SerdaoInput } from '../../component/input/serdao-input/SerdaoInput';
import { Utils } from '../../utils';
import { Dropdown } from 'react-native-element-dropdown';
import { isEmpty } from 'lodash';
import { IBANInformationInterface } from './TransactionContext.types';
import { SerdaoButton } from '../../component/button/Button';
import { SerdaoButtonTypeEnum } from '../../component/button/Button.types';
import { ScreenId } from '../../../AppEnum';

const TransactionScreen = ({ navigation }: any) => {
  const [iban, setIban] = useState<IBANInformationInterface>();
  const { addTransaction, listIBAN } = useTransactions();
  const amountRef = useRef<number>(0);

  const name = useMemo(() => {
    return !!iban?.firstName && !!iban?.lastName ? `${iban.firstName} ${iban.lastName}` : ''
  }, [iban])

  const handleTransaction = useCallback(() => {
    if (!isEmpty(iban) && !!name && amountRef.current > 0) {
      const accountDetails = { name, iban: iban?.iban };
      addTransaction(String(amountRef.current), accountDetails);
      navigation.goBack();
    }
  }, [iban, addTransaction, navigation, name]);

  const renderAmount = useCallback(() => {
    return (
      <SerdaoInput
        key={'amount-input'}
        floatingLabel={'Amount'}
        placeholder={Utils.generateExample('50000')}
        maxLength={34}
        autoCapitalize={'characters'}
        onChangeText={(value: string) => {
          amountRef.current = parseInt(value);
        }}
        editable={!isEmpty(listIBAN)}
      />
    )
  }, [listIBAN])

  const renderIBAN = useCallback(() => {
    return (
      <View style={styles.dropdown}>
        <View style={styles.floatingLabel}>
          <Text style={styles.floatingLabelText}>{'Recipient IBAN'}</Text>
        </View>
        {
          isEmpty(listIBAN) ?
            <TouchableOpacity onPress={() => navigation.navigate(ScreenId.addIBAN)} style={styles.empty}>
              <Text>No IBAN found, click here to add one!</Text>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/32/32213.png' }} style={styles.icon} />
            </TouchableOpacity>
            :
            <Dropdown
              data={listIBAN}
              labelField="iban"
              valueField="iban"
              placeholder="Select Recipient IBAN"
              onChange={(item: IBANInformationInterface) => {
                setIban({
                  iban: item.iban,
                  firstName: item.firstName,
                  lastName: item.lastName
                });
              }}
            />
        }

      </View>
    )
  }, [listIBAN, setIban]);

  const renderFullName = useCallback(() => {
    return (
      <View style={styles.dropdown}>
        <View style={styles.floatingLabel}>
          <Text style={styles.floatingLabelText}>{'Recipient Name'}</Text>
        </View>
        <Text>{name || 'Choose Recipient'}</Text>
      </View>
    )
  }, [name]);

  const renderButton = useCallback(() => {
    return (
      <SerdaoButton
        title="Submit Transaction"
        onPress={handleTransaction}
        type={isEmpty(listIBAN) ? SerdaoButtonTypeEnum.disabled : SerdaoButtonTypeEnum.primary}
      />
    )
  }, [handleTransaction, listIBAN])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrap}>
        <Text style={styles.title}>{"Make transaction"}</Text>
        {renderAmount()}
        {renderIBAN()}
        {renderFullName()}
        {renderButton()}
      </View>
    </ScrollView>
  );
};

export default TransactionScreen;

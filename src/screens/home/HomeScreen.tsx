import React, { useCallback } from 'react';
import { View, Text, FlatList, ScrollView, Image } from 'react-native';
import { useTransactions } from '../transaction/TransactionContext';
import { ScreenId } from '../../../AppEnum';
import { styles } from './HomeScreen.styles';
import { IBANInformationInterface } from '../transaction/TransactionContext.types';
import { SerdaoButton } from '../../component/button/Button';
import { isEmpty } from 'lodash';

const HomeScreen = ({ navigation }: any) => {
  const { transactions, balance, listIBAN } = useTransactions();

  const renderTitle = useCallback((title = '') => {
    return <Text style={styles.blockTitle}>{title}</Text>
  }, []);

  const renderItemSeparatorComponent = useCallback(() => {
    return <View style={styles.itemSeparator} />
  }, []);

  const renderItem = useCallback(({ item }: any) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Transaction ID: {item.id}</Text>
      <Text style={styles.itemText}>Amount: ${item.amount.toFixed(2)}</Text>
      {item.account && (
        <>
          <Text style={styles.itemText}>To: {item.account.name}</Text>
          <Text style={styles.itemText}>IBAN: {item.account.iban}</Text>
        </>
      )}
    </View>
  ), []);

  const renderBalanceCard = useCallback(() => {
    return (
      <View>
        <Text style={styles.balanceText}>Current Balance: ${balance.toFixed(2)}</Text>
        <View style={styles.buttonContainer}>
          <SerdaoButton
            style={{ flex: 0.5 }}
            title='Add Transaction'
            onPress={() => navigation.navigate(ScreenId.transaction)}
          />
          <SerdaoButton
            style={{ flex: 0.5 }}
            title="Add IBAN"
            onPress={() => navigation.navigate(ScreenId.addIBAN)}
          />
        </View>
      </View>
    )
  }, [balance, ScreenId.transaction, ScreenId.addIBAN])

  const renderIban = useCallback(({ item }: { item: IBANInformationInterface }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>Name Card:</Text>
        <Text style={styles.subTitle}>{item.firstName} {item.lastName}</Text>
        <Text style={styles.title}>IBAN:</Text>
        <Text style={styles.subTitle}>{item.iban}</Text>
      </View>
    )
  }, []);

  const renderEmpty = useCallback(() => {
    return (
      <View style={styles.empty}>
        <Image
          source={{ uri: 'https://static.vecteezy.com/system/resources/previews/038/010/644/non_2x/no-transaction-history-yet-concept-illustration-flat-design-simple-modern-graphic-element-for-empty-state-ui-infographic-icon-vector.jpg' }}
          style={styles.image}
        />
        <Text style={styles.emptyText}>Empty List</Text>
      </View>
    )
  }, []);

  const renderListBeneficiaries = useCallback(() => {
    return (
      <View style={styles.listContainer}>
        {renderTitle('Beneficiaries')}
        <FlatList
          data={listIBAN}
          keyExtractor={(item) => item.iban}
          renderItem={renderIban}
          showsHorizontalScrollIndicator={false}
          horizontal={!isEmpty(listIBAN)}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={renderItemSeparatorComponent}
          ListEmptyComponent={renderEmpty}
        />
      </View>
    )
  }, [renderTitle, listIBAN, renderIban, renderItemSeparatorComponent, renderEmpty])

  const renderListTransactions = useCallback(() => {
    return (
      <View style={styles.listContainer}>
        {renderTitle('Transactions')}
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={renderItemSeparatorComponent}
          ListEmptyComponent={renderEmpty}
        />
      </View>
    )
  }, [transactions, renderItem, renderEmpty, renderTitle, renderItemSeparatorComponent])

  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1, paddingBottom: 24 }}>
        {renderBalanceCard()}
        {renderListBeneficiaries()}
        {renderListTransactions()}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

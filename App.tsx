import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/home/HomeScreen';
import TransactionScreen from './src/screens/transaction/TransactionScreen';
import { TransactionProvider } from './src/screens/transaction/TransactionContext';
import { AddIBANScreen } from './src/screens/add-iban/AddIBANScreen';
import { ScreenId } from './AppEnum';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <TransactionProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={ScreenId.home} component={HomeScreen} />
          <Stack.Screen name={ScreenId.transaction} component={TransactionScreen} />
          <Stack.Screen name={ScreenId.addIBAN} component={AddIBANScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TransactionProvider>
  );
};

export default App;

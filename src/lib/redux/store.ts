import { configureStore } from '@reduxjs/toolkit';
import settingAppReduce from './system/settingSys';
import userCurrentReduce from './app/userCurrent.slice';
import userReduce from './app/users.slice';
import paymentTypeReduce from './app/paymentType.slice';
import paymentReduce from './app/payment.slice';
import paymentTransactionReduce from './app/paymentTransaction.slice';
import diceGameReduce from './app/diceGame.slice';
import diceDetailReduce from './app/diceDetail.slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      settingApp: settingAppReduce,
      userCurrent: userCurrentReduce,
      users: userReduce,
      paymentTypes: paymentTypeReduce,
      payment: paymentReduce,
      paymentTransaction: paymentTransactionReduce,
      diceGame: diceGameReduce,
      diceDetail: diceDetailReduce,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

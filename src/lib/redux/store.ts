import { configureStore } from '@reduxjs/toolkit';
import settingAppReduce from './system/settingSys';
import userCurrentReduce from './app/userCurrent.slice';
import userReduce from './app/users.slice';
import paymentTypeReduce from './app/paymentType.slice';
import paymentReduce from './app/payment.slice';
import paymentTransactionReduce from './app/paymentTransaction.slice';
import diceGameReduce from './app/diceGame.slice';
import diceDetailReduce from './app/diceDetail.slice';
import dicePlayHistoryReduce from './app/dicePlayHistory.slice';
import gifCodeReduce from './app/gifCode.slice';
import userPointReduce from './app/pointUser.slice';
import baccaratGameReduce from './app/baccaratGame.slice';
import baccaratDetailReduce from './app/baccaratDetail.slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      settingApp: settingAppReduce,
      userCurrent: userCurrentReduce,
      users: userReduce,
      userPoint: userPointReduce,
      paymentTypes: paymentTypeReduce,
      payment: paymentReduce,
      paymentTransaction: paymentTransactionReduce,
      diceGame: diceGameReduce,
      diceDetail: diceDetailReduce,
      dicePlayHistory: dicePlayHistoryReduce,
      gifCode: gifCodeReduce,
      baccaratGame: baccaratGameReduce,
      baccaratDetail: baccaratDetailReduce,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

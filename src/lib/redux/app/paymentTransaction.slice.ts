import { TypePaymentTranSaction, TypeSort } from '@/constants';
import { createSlice } from '@reduxjs/toolkit';

export interface TransactionItem {
  id: number;
  // paymentId: number;
  userId: number;
  user: {
    id: number;
    username: string;
    email: string;
  };
  bankTransfer: {
    id: number;
    nameBank: string;
    accountOwner: string;
  };
  bankReceive: {
    id: number;
    nameBank: string;
    accountOwner: string;
  };
  qrCode: string;
  type: number;
  point: number;
  status: number;
  receipt: string;
  // title: string;
  // notificationId: number;
  // notification: NotificationModel;
  showAccount: boolean;
}

interface PaymentTransactionSlice {
  isInitData: boolean;
  paymentTransaction: TransactionItem[];
  page: number;
  limit: number;
  search: string;
  total: number;
  type: number;
  status: any;
  sort: string;
  typeSort: string;
  transactionIdEdit: string;
}

const paymentTransactionSlice = createSlice({
  name: 'paymentTransaction',
  initialState: {
    isInitData: false,
    paymentTransaction: [],
    page: 1,
    limit: 10,
    search: '',
    total: 0,
    type: TypePaymentTranSaction.deposit,
    status: undefined,
    sort: 'createdAt',
    typeSort: TypeSort.DESC,
    transactionIdEdit: '',
  } as PaymentTransactionSlice,
  reducers: {
    setDataPaymentTransaction: (state, action) => {
      state.paymentTransaction = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.isInitData = true;
    },
    setLimitOrPagePaymentTransaction: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
    },
    resetDataPaymentTransaction(state) {
      state.isInitData = false;
      state.paymentTransaction = [];
      state.page = 1;
      state.limit = 10;
      state.transactionIdEdit = '';
    },
    setTransactionEdit(state, action) {
      state.transactionIdEdit = action.payload.id;
    },
    setTypePaymentTransaction(state, action) {
      state.type = action.payload.type;
    },
  },
});

export const { setDataPaymentTransaction, setLimitOrPagePaymentTransaction, resetDataPaymentTransaction, setTransactionEdit, setTypePaymentTransaction } = paymentTransactionSlice.actions;

export default paymentTransactionSlice.reducer;

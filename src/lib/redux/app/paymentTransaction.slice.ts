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
    binBank: number;
    nameBank: string;
    accountOwner: string;
    accountNumber: number;
  };
  bankReceive: {
    id: number;
    binBank: number;
    nameBank: string;
    accountOwner: string;
    accountNumber: number;
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
  createdAt: string;
}

interface PaymentTransactionBrief {
  deposit?: number;
  withdraw?: number;
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
  dateFrom: string;
  dateTo: string;
  dataBrief: PaymentTransactionBrief;
  submitRangerDate: boolean;
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
    dateFrom: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 31).toISOString(),
    dateTo: new Date().toISOString(),
    dataBrief: {},
    submitRangerDate: true,
  } as PaymentTransactionSlice,
  reducers: {
    setDataPaymentTransaction: (state, action) => {
      state.paymentTransaction = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.isInitData = true;
      state.submitRangerDate = false;
    },
    setLimitOrPagePaymentTransaction: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
    },
    resetDataPaymentTransaction(state) {
      state.isInitData = false;
      state.submitRangerDate = false;
      state.paymentTransaction = [];
      state.page = 1;
      state.limit = 10;
      state.transactionIdEdit = '';
      state.dataBrief = {};
    },
    setTransactionEdit(state, action) {
      state.transactionIdEdit = action.payload.id;
    },
    setQueryPaymentTransaction(state, action) {
      state.type = action.payload.type != undefined ? action.payload.type : state.type;
      state.status = action.payload.status != undefined ? action.payload.status : state.status;
    },
    setDataBriefPaymentTransaction(state, action: { payload: { deposit: number; withdraw: number } }) {
      state.dataBrief.deposit = action.payload.deposit;
      state.dataBrief.withdraw = action.payload.withdraw;
      state.submitRangerDate = false;
    },
    setDateRangerPaymentTrans(state, action) {
      state.dateFrom = action.payload.dateFrom;
      state.dateTo = action.payload.dateTo;
      state.submitRangerDate = false;
    },
    setSubmitDateRangerPaymentTrans(state, action) {
      state.submitRangerDate = action.payload.submit;
    },
  },
});

export const { setDataPaymentTransaction, setLimitOrPagePaymentTransaction, resetDataPaymentTransaction, setTransactionEdit, setQueryPaymentTransaction, setDataBriefPaymentTransaction, setDateRangerPaymentTrans, setSubmitDateRangerPaymentTrans } = paymentTransactionSlice.actions;

export default paymentTransactionSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

interface paymentItem {
  methodName: string;
  methodImage: string;
  nameWarning: string;
  status: string;
  type: string;
  imagePopup: string;
  message: string;
  showAccount: boolean;
}

interface BankItem {
  nameBank: string;
  binBank: string;
  branch: string;
  accountOwner: string;
  accountNumber: string;
}

interface PaymentSlice {
  isInitData: boolean;
  payment: paymentItem[];
  isInitDataBank: boolean;
  banks: BankItem[];
  page: number;
  limit: number;
  search: string;
  total: number;
}

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    isInitData: false,
    isInitDataBank: false,
    payment: [],
    page: 1,
    limit: 10,
    search: '',
    total: 0,
    banks: [],
  } as PaymentSlice,
  reducers: {
    setDataPayment: (state, action) => {
      state.payment = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.isInitData = true;
    },
    setLimitOrPagePayment: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
    },
    resetDataPayment(state) {
      state.isInitData = false;
      state.payment = [];
      state.page = 1;
      state.limit = 10;
    },
    setDataPaymentBanks(state, action) {
      state.banks = action.payload.data;
      state.isInitDataBank = action.payload.isInitDataBank;
    },
  },
});

export const { setDataPayment, setLimitOrPagePayment, resetDataPayment, setDataPaymentBanks } = paymentSlice.actions;

export default paymentSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

interface paymentItem {
  name: string;
  minimum: string;
  maximum: string;
  status: string;
}

interface PaymentSlice {
  isInitData: boolean;
  payment: paymentItem[];
  page: number;
  limit: number;
  search: string;
  total: number;
}

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    isInitData: false,
    payment: [],
    page: 1,
    limit: 10,
    search: '',
    total: 0,
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
  },
});

export const { setDataPayment, setLimitOrPagePayment, resetDataPayment } = paymentSlice.actions;

export default paymentSlice.reducer;

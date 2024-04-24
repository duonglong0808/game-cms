import { createSlice } from '@reduxjs/toolkit';

interface paymentTypesItem {
  name: string;
  minimum: string;
  maximum: string;
  status: string;
}

interface PaymentTypesSlice {
  isInitData: boolean;
  paymentTypes: paymentTypesItem[];
  page: number;
  limit: number;
  search: string;
  total: number;
}

const paymentTypesSlice = createSlice({
  name: 'paymentTypes',
  initialState: {
    isInitData: false,
    paymentTypes: [],
    page: 1,
    limit: 10,
    search: '',
    total: 0,
  } as PaymentTypesSlice,
  reducers: {
    setDataPaymentTypes: (state, action) => {
      state.paymentTypes = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.isInitData = true;
    },
    setLimitOrPagePaymentTypes: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
    },
    resetDataPaymentType(state) {
      state.isInitData = false;
      state.paymentTypes = [];
      state.page = 1;
      state.limit = 10;
    },
  },
});

export const { setDataPaymentTypes, setLimitOrPagePaymentTypes, resetDataPaymentType } = paymentTypesSlice.actions;

export default paymentTypesSlice.reducer;

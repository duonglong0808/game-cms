import { TypeSort } from '@/constants';
import { createSlice } from '@reduxjs/toolkit';

export interface BaccaratDetailItem {
  id: number;
  transaction: number;
  mainTransaction: number;
  pokerBanker: string;
  pokerPlayer: string;
  pointPlayer: number;
  pointBanker: number;
  status?: number;
  dateId: number;
  totalBet: number;
  totalReward: number;
  createdAt: string;
  updatedAt: string;
}

interface BaccaratDetailSlice {
  isInitData: boolean;
  baccaratDetail: BaccaratDetailItem[];
  page: number;
  limit: number;
  search: string;
  total: number;
  sort: string;
  typeSort: string;
  baccaratDetailIdEdit: string;
}

const BaccaratDetailSlice = createSlice({
  name: 'BaccaratDetail',
  initialState: {
    isInitData: false,
    baccaratDetail: [],
    page: 1,
    limit: 10,
    search: '',
    total: 0,
    sort: 'translation',
    typeSort: TypeSort.DESC,
    baccaratDetailIdEdit: '',
  } as BaccaratDetailSlice,
  reducers: {
    setDataBaccaratDetail: (state, action) => {
      state.baccaratDetail = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.isInitData = true;
    },
    setLimitOrPageBaccaratDetail: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
    },
    resetDataBaccaratDetail(state) {
      state.isInitData = false;
      state.baccaratDetail = [];
      state.page = 1;
      state.limit = 10;
      state.baccaratDetailIdEdit = '';
    },
    setBaccaratDetailIdEdit(state, action) {
      state.baccaratDetailIdEdit = action.payload.id;
    },
  },
});

export const { setDataBaccaratDetail, setLimitOrPageBaccaratDetail, resetDataBaccaratDetail, setBaccaratDetailIdEdit } = BaccaratDetailSlice.actions;

export default BaccaratDetailSlice.reducer;

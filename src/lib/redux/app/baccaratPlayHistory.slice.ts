import { createSlice } from '@reduxjs/toolkit';

export interface HistoryPlayBaccaratItem {
  id: number;
  answer: number;
  point: number;
  status: number;
  gameBaccaratId: number;
  baccaratDetailId: number;
  type: string;
  user: {
    username: string;
  };
  createdAt: Date;
}

interface BaccaratPlayHistorySlice {
  isInitData: boolean;
  baccaratPlayHistory: HistoryPlayBaccaratItem[];
  page: number;
  limit: number;
  total: number;
  userId: number | undefined;
  gameBaccaratId: number | undefined;
  baccaratDetailId: number | undefined;
  sort: string;
  typeSort: string;
  submitted: boolean;
}

const BaccaratPlayHistorySlice = createSlice({
  name: 'baccaratPlayHistory',
  initialState: {
    isInitData: false,
    baccaratPlayHistory: [],
    page: 1,
    limit: 10,
    total: 0,
    userId: undefined,
    baccaratDetailId: undefined,
    gameBaccaratId: undefined,
    sort: '',
    typeSort: '',
    submitted: false,
  } as BaccaratPlayHistorySlice,
  reducers: {
    setDataBaccaratPlayHistory: (state, action) => {
      state.baccaratPlayHistory = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.isInitData = true;
      state.submitted = false;
    },
    setLimitOrPageBaccaratPlayHistory: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
    },
    resetDataBaccaratPlayHistory(state) {
      state.isInitData = false;
      state.isInitData = false;
      state.baccaratPlayHistory = [];
      state.page = 1;
      state.limit = 10;
      state.userId = undefined;
      state.baccaratDetailId = undefined;
      state.gameBaccaratId = undefined;
    },
    setQueryBaccaratPlayHistory(state, action) {
      const payload = action.payload;
      state.userId = payload.userId ? payload.userId : state.userId;
      state.baccaratDetailId = payload.baccaratDetailId ? payload.baccaratDetailId : state.baccaratDetailId;
      state.gameBaccaratId = payload.gameBaccaratId ? payload.gameBaccaratId : state.gameBaccaratId;
    },
    setStatusSubmitBaccaratPlayHistory(state, action) {
      state.submitted = action.payload.submitted;
      state.page = 1;
    },
  },
});

export const { setDataBaccaratPlayHistory, setLimitOrPageBaccaratPlayHistory, resetDataBaccaratPlayHistory, setQueryBaccaratPlayHistory, setStatusSubmitBaccaratPlayHistory } = BaccaratPlayHistorySlice.actions;

export default BaccaratPlayHistorySlice.reducer;

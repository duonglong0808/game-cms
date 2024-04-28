import { TypeSort } from '@/constants';
import { createSlice } from '@reduxjs/toolkit';

export interface DiceDetailItem {
  id: number;
  transaction: number;
  mainTransaction: number;
  totalRed: number;
  status?: number;
  dateId: number;
  createdAt: string;
  updatedAt: string;
}

interface DiceDetailSlice {
  isInitData: boolean;
  diceDetail: DiceDetailItem[];
  page: number;
  limit: number;
  search: string;
  total: number;
  sort: string;
  typeSort: string;
  diceDetailIdEdit: string;
}

const DiceDetailSlice = createSlice({
  name: 'diceDetail',
  initialState: {
    isInitData: false,
    diceDetail: [],
    page: 1,
    limit: 10,
    search: '',
    total: 0,
    sort: 'translation',
    typeSort: TypeSort.DESC,
    diceDetailIdEdit: '',
  } as DiceDetailSlice,
  reducers: {
    setDataDiceDetail: (state, action) => {
      state.diceDetail = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.isInitData = true;
    },
    setLimitOrPageDiceDetail: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
    },
    resetDataDiceDetail(state) {
      state.isInitData = false;
      state.diceDetail = [];
      state.page = 1;
      state.limit = 10;
      state.diceDetailIdEdit = '';
    },
    setDiceDetailIdEdit(state, action) {
      state.diceDetailIdEdit = action.payload.id;
    },
  },
});

export const { setDataDiceDetail, setLimitOrPageDiceDetail, resetDataDiceDetail, setDiceDetailIdEdit } = DiceDetailSlice.actions;

export default DiceDetailSlice.reducer;

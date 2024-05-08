import { createSlice } from '@reduxjs/toolkit';

export interface TransactionItem {
  id: number;
  answer: number;
  point: number;
  status: number;
  gameDiceId: number;
  diceDetailId: number;
  userId: number;
  createdAt: Date;
}

interface DicePlayHistorySlice {
  isInitData: boolean;
  dicePlayHistory: TransactionItem[];
  page: number;
  limit: number;
  total: number;
  userId: number | undefined;
  gameDiceId: number | undefined;
  diceDetailId: number | undefined;
  sort: string;
  typeSort: string;
  submitted: boolean;
}

const DicePlayHistorySlice = createSlice({
  name: 'dicePlayHistory',
  initialState: {
    isInitData: false,
    dicePlayHistory: [],
    page: 1,
    limit: 10,
    total: 0,
    userId: undefined,
    diceDetailId: undefined,
    gameDiceId: undefined,
    sort: '',
    typeSort: '',
    submitted: false,
  } as DicePlayHistorySlice,
  reducers: {
    setDataDicePlayHistory: (state, action) => {
      state.dicePlayHistory = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.isInitData = true;
      state.submitted = false;
    },
    setLimitOrPageDicePlayHistory: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
    },
    resetDataDicePlayHistory(state) {
      state.isInitData = false;
      state.isInitData = false;
      state.dicePlayHistory = [];
      state.page = 1;
      state.limit = 10;
      state.userId = undefined;
      state.diceDetailId = undefined;
      state.gameDiceId = undefined;
    },
    setQueryDicePlayHistory(state, action) {
      const payload = action.payload;
      state.userId = payload.userId ? payload.userId : state.userId;
      state.diceDetailId = payload.diceDetailId ? payload.diceDetailId : state.diceDetailId;
      state.gameDiceId = payload.gameDiceId ? payload.gameDiceId : state.gameDiceId;
    },
    setStatusSubmitDicePlayHistory(state, action) {
      state.submitted = action.payload.submitted;
    },
  },
});

export const { setDataDicePlayHistory, setLimitOrPageDicePlayHistory, resetDataDicePlayHistory, setQueryDicePlayHistory, setStatusSubmitDicePlayHistory } = DicePlayHistorySlice.actions;

export default DicePlayHistorySlice.reducer;

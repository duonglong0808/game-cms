import { TypeSort } from '@/constants';
import { createSlice } from '@reduxjs/toolkit';

export interface TransactionItem {
  id: number;
  type: string;
  name: string;
  nameAuthor: string;
  avtAuthor: string;
  nationalAuthor: string;
  idLive: string;
  createdAt: string;
  updatedAt: string;
}

interface DiceGameSlice {
  isInitData: boolean;
  diceGame: TransactionItem[];
  page: number;
  limit: number;
  search: string;
  total: number;
  sort: string;
  typeSort: string;
  diceGameIdEdit: string;
}

const DiceGameSlice = createSlice({
  name: 'diceGame',
  initialState: {
    isInitData: false,
    diceGame: [],
    page: 1,
    limit: 10,
    search: '',
    total: 0,
    sort: 'createdAt',
    typeSort: TypeSort.DESC,
    diceGameIdEdit: '',
  } as DiceGameSlice,
  reducers: {
    setDataDiceGame: (state, action) => {
      state.diceGame = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.isInitData = true;
    },
    setLimitOrPageDiceGame: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
    },
    resetDataDiceGame(state) {
      state.isInitData = false;
      state.diceGame = [];
      state.page = 1;
      state.limit = 10;
      state.diceGameIdEdit = '';
    },
    setTransactionEdit(state, action) {
      state.diceGameIdEdit = action.payload.id;
    },
  },
});

export const { setDataDiceGame, setLimitOrPageDiceGame, resetDataDiceGame, setTransactionEdit } = DiceGameSlice.actions;

export default DiceGameSlice.reducer;

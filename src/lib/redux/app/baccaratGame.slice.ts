import { TypeSort } from '@/constants';
import { createSlice } from '@reduxjs/toolkit';

export interface BaccaratItem {
  id: number;
  type: string;
  name: string;
  nameAuthor: string;
  avtAuthor: string;
  nationalAuthor: string;
  idLive: string;
  idLiveMobile: string;
  idChat: string;
  createdAt: string;
  updatedAt: string;
}

interface BaccaratGameSlice {
  isInitData: boolean;
  baccaratGame: BaccaratItem[];
  page: number;
  limit: number;
  search: string;
  total: number;
  sort: string;
  typeSort: string;
  baccaratGameIdEdit: string;
}

const BaccaratGameSlice = createSlice({
  name: 'baccaratGame',
  initialState: {
    isInitData: false,
    baccaratGame: [],
    page: 1,
    limit: 10,
    search: '',
    total: 0,
    sort: 'id',
    typeSort: TypeSort.ASC,
    baccaratGameIdEdit: '',
  } as BaccaratGameSlice,
  reducers: {
    setDataBaccaratGame: (state, action) => {
      state.baccaratGame = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.isInitData = true;
    },
    setLimitOrPageBaccaratGame: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
    },
    resetDataBaccaratGame(state) {
      state.isInitData = false;
      state.baccaratGame = [];
      state.page = 1;
      state.limit = 10;
      state.baccaratGameIdEdit = '';
    },
    setBaccaratGameEdit(state, action) {
      state.baccaratGameIdEdit = action.payload.id;
    },
  },
});

export const { resetDataBaccaratGame, setBaccaratGameEdit, setDataBaccaratGame, setLimitOrPageBaccaratGame } = BaccaratGameSlice.actions;

export default BaccaratGameSlice.reducer;

import { TypeSort } from '@/constants';
import { createSlice } from '@reduxjs/toolkit';

export interface GiftCodeItem {
  id: number;
  code: string;
  name: string;
  userCreate: {
    username: string;
  };
  point: number;
  status: number;
  userUse?: {
    username: string;
  };
  timeUse: Date;
  createdAt: string;
  updatedAt: string;
}

interface GiftCodeSlice {
  isInitData: boolean;
  giftCode: GiftCodeItem[];
  page: number;
  limit: number;
  status?: number;
  userIdUse?: number;
  total: number;
  sort: string;
  typeSort: string;
  giftCodeIdEdit: string;
}

const GiftCodeSlice = createSlice({
  name: 'giftCode',
  initialState: {
    isInitData: false,
    giftCode: [],
    page: 1,
    limit: 10,
    status: undefined,
    userIdUse: undefined,
    total: 0,
    sort: 'id',
    typeSort: TypeSort.DESC,
    giftCodeIdEdit: '',
  } as GiftCodeSlice,
  reducers: {
    setDataGiftCode: (state, action) => {
      state.giftCode = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.isInitData = true;
    },
    setLimitOrPageGiftCode: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
    },
    resetDataGiftCode(state) {
      state.isInitData = false;
      state.giftCode = [];
      state.page = 1;
      state.limit = 10;
      state.status = undefined;
      state.userIdUse = undefined;
      state.giftCodeIdEdit = '';
    },
    setFilterGiftCode(
      state,
      action: {
        payload: { status?: number; userIdUse?: number };
      },
    ) {
      if (action.payload.status) state.status = action.payload.status;
      if (action.payload.userIdUse) state.userIdUse = action.payload.userIdUse;
    },
    setGiftCodeEdit(state, action) {
      state.giftCodeIdEdit = action.payload.id;
    },
  },
});

export const { setDataGiftCode, setLimitOrPageGiftCode, setFilterGiftCode, resetDataGiftCode, setGiftCodeEdit } = GiftCodeSlice.actions;

export default GiftCodeSlice.reducer;

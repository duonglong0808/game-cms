import { TypeSort } from '@/constants';
import { createSlice } from '@reduxjs/toolkit';
import { tree } from 'next/dist/build/templates/app-page';

export interface PointItem {
  id: number;
  gamePoint: {
    name: string;
  };
  points: number;
  user: {
    name: string;
  };
  createdAt: string;
}

export interface HistoryTransfer {
  id: number;
  gameReceiver: {
    name: string;
  };
  gameTransfer: {
    name: string;
  };
  pointTrans: number;
  surplus: number;
  description: string;
  createdAt: string;
}

interface UserPointSlice {
  isInitData: boolean;
  typeSearch: string;
  userPoint: PointItem[];
  historyTransferPoint: HistoryTransfer[];
  page: number;
  limit: number;
  total: number;
  status: any;
  sort: string;
  typeSort: string;
  dateFrom: string;
  dateTo: string;
}

const UserPointSlice = createSlice({
  name: 'userPoint',
  initialState: {
    isInitData: false,
    typeSearch: 'point',
    userPoint: [],
    historyTransferPoint: [],
    page: 1,
    limit: 10,
    total: 0,
    status: undefined,
    sort: 'createdAt',
    typeSort: TypeSort.DESC,
    dateFrom: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    dateTo: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 1).toISOString(),
  } as UserPointSlice,
  reducers: {
    setDataUserPoint: (state, action) => {
      state.userPoint = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.isInitData = true;
    },
    setDataHistoryTransferPoint: (state, action) => {
      state.historyTransferPoint = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.isInitData = true;
    },
    setLimitOrPageUserPoint: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
    },
    resetDataUserPoint(state) {
      state.isInitData = false;
      state.userPoint = [];
      state.historyTransferPoint = [];
      state.page = 1;
      state.limit = 10;
    },
    setDateRangerUserPoint(state, action) {
      state.dateFrom = action.payload.dateFrom;
      state.dateTo = action.payload.dateTo;
    },
    setTypeSearchUserPoint(state, action: { payload: { typeSearch: string } }) {
      state.typeSearch = action.payload.typeSearch;
    },
    setRefreshDataUserPoint(
      state,
      action: {
        payload: {
          isInitData: boolean;
        };
      },
    ) {
      state.isInitData = action.payload.isInitData;
      state.page = 1;
      state.limit = 10;
    },
  },
});

export const { setDataUserPoint, setDataHistoryTransferPoint, setTypeSearchUserPoint, setLimitOrPageUserPoint, resetDataUserPoint, setDateRangerUserPoint, setRefreshDataUserPoint } = UserPointSlice.actions;

export default UserPointSlice.reducer;

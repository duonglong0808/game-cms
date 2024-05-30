import { createSlice } from '@reduxjs/toolkit';

interface userItem {
  username: string;
  name: string;
  phone: string;
  status: string;
  typeUser: string;
}

interface UsersSlice {
  isInitData: boolean;
  users: userItem[];
  page: number;
  limit: number;
  search: string;
  total: number;
  phone: string;
}

const usersSlice = createSlice({
  name: 'user',
  initialState: {
    isInitData: false,
    users: [],
    page: 1,
    limit: 10,
    search: '',
    phone: '',
    total: 0,
  } as UsersSlice,
  reducers: {
    setDataUsers: (state, action) => {
      state.users = action.payload?.users;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.isInitData = true;
    },
    setLimitOrPageUser: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
    },
    resetDataUser: (state) => {
      state.users = [];
      state.page = 1;
      state.limit = 10;
      state.total = 0;
      state.isInitData = false;
      state.search = '';
      state.phone = '';
    },
    setFilterUser: (state, action: { payload: { search: string; phone: string } }) => {
      state.page = 1;
      state.search = action.payload.search;
      state.phone = action.payload.phone;
    },
    refreshDataUser: (state) => {
      state.isInitData = false;
    },
  },
});

export const { setDataUsers, setLimitOrPageUser, resetDataUser, refreshDataUser, setFilterUser } = usersSlice.actions;

export default usersSlice.reducer;

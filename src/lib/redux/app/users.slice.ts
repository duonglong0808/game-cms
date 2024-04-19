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
}

const usersSlice = createSlice({
  name: 'user',
  initialState: {
    isInitData: false,
    users: [],
    page: 1,
    limit: 10,
    search: '',
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
  },
});

export const { setDataUsers, setLimitOrPageUser } = usersSlice.actions;

export default usersSlice.reducer;

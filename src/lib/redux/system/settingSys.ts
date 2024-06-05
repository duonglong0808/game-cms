import { createSlice } from '@reduxjs/toolkit';

interface SettingAppSlice {
  mood: string;
  // titleMessage: string;
  // descMessage: string;
  // showIconClosed: boolean;
  // textConfirm: string;
  // textClose: string;
  dateFrom: string;
  dateTo: string;
  isLoading: boolean;
}

const settingAppSlice = createSlice({
  name: 'settingApp',
  initialState: {
    // titleMessage: '',
    // descMessage: '',
    // textConfirm: '',
    // textClose: '',
    // mood: 'light',
    // showIconClosed: false,
    mood: 'dark',
    isLoading: false,
    dateFrom: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    dateTo: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 1).toISOString(),
  } as SettingAppSlice,
  reducers: {
    setMoodApp: (state, action) => {
      state.mood = action.payload;
    },
    // setMessageApp: (state, action: { payload: { titleMessage: string; descMessage: string; textConfirm: string; textClose: string; showIconClosed?: boolean } }) => {
    //   state.titleMessage = action.payload?.titleMessage;
    //   state.descMessage = action.payload?.descMessage;
    //   state.textConfirm = action.payload?.textConfirm;
    //   state.textClose = action.payload?.textClose;

    //   if (action.payload?.showIconClosed != undefined) state.showIconClosed = action.payload?.showIconClosed;
    // },
    // cleanDataMessage: (state, action) => {
    //   state.titleMessage = '';
    //   state.descMessage = '';
    //   state.textConfirm = '';
    //   state.textClose = '';
    // },
    setLoadingApp: (state, action: { payload: { loading: boolean } }) => {
      state.isLoading = action.payload.loading;
    },
    setDateRangerDashboard(state, action) {
      state.dateFrom = action.payload.dateFrom;
      state.dateTo = action.payload.dateTo;
    },
  },
});

export const { setMoodApp, setLoadingApp, setDateRangerDashboard } = settingAppSlice.actions;

export default settingAppSlice.reducer;

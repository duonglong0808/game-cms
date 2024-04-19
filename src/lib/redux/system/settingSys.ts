import { createSlice } from '@reduxjs/toolkit';

interface SettingAppSlice {
  mood: string;
  titleMessage: string;
  descMessage: string;
  showIconClosed: boolean;
  textConfirm: string;
  textClose: string;
}

const settingAppSlice = createSlice({
  name: 'settingApp',
  initialState: {
    mood: 'dark',
    titleMessage: '',
    descMessage: '',
    textConfirm: '',
    textClose: '',
    // mood: 'light',
    showIconClosed: false,
  } as SettingAppSlice,
  reducers: {
    setMoodApp: (state, action) => {
      state.mood = action.payload;
    },
    setMessageApp: (state, action: { payload: { titleMessage: string; descMessage: string; textConfirm: string; textClose: string; showIconClosed?: boolean } }) => {
      state.titleMessage = action.payload?.titleMessage;
      state.descMessage = action.payload?.descMessage;
      state.textConfirm = action.payload?.textConfirm;
      state.textClose = action.payload?.textClose;

      if (action.payload?.showIconClosed != undefined) state.showIconClosed = action.payload?.showIconClosed;
    },
    cleanDataMessage: (state, action) => {
      state.titleMessage = '';
      state.descMessage = '';
      state.textConfirm = '';
      state.textClose = '';
    },
  },
});

export const { setMoodApp, setMessageApp, cleanDataMessage } = settingAppSlice.actions;

export default settingAppSlice.reducer;

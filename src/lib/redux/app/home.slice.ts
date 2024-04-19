// import { createSlice } from '@reduxjs/toolkit';

// interface HomeSlice {
//   limit: number;
//   isLoading: boolean;
//   isLoadMore: boolean;
//   dataGroupSelected: any;
// }

// export const homeSlice = createSlice({
//   name: 'home',
//   initialState: {
//     lisBoxMessage: [],
//     limit: 10,
//     isLoading: false,
//     isLoadMore: false,
//     dataGroupSelected: null,
//   } as HomeSlice,
//   reducers: {
//     resetDataBoxMessage: state => {
//       state.lisBoxMessage = [];
//       state.isLoadMore = false;
//       state.isLoading = false;
//       state.dataGroupSelected = null;
//     },
//     addBoxSearchAndSavePagination: (state, action) => {
//       state.limit = action.payload.limit;
//       state.lisBoxMessage.push(...action.payload.data);
//       state.isLoadMore = false;
//       state.isLoading = false;
//     },
//     setLoadMoreBoxMessage: state => {
//       state.isLoadMore = true;
//       state.isLoadMore = true;
//     },
//     setDataGroupSelect: (state, action) => {
//       state.dataGroupSelected = action.payload.data;
//     },
//   },
// });

// export const { resetDataBoxMessage, addBoxSearchAndSavePagination, setLoadMoreBoxMessage, setDataGroupSelect } = homeSlice.actions;

// export default homeSlice.reducer;

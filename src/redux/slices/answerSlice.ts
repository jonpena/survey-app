import { createSlice } from "@reduxjs/toolkit";

export const datesSlice = createSlice({
  name: "answers",
  initialState: { answers: [] },
  reducers: {
    // updateDates: (state, action) => {
    //   // state.dates = action.payload.dates;
    // },
  },
});

// export const { updateDates } = datesSlice.actions;

export default datesSlice.reducer;

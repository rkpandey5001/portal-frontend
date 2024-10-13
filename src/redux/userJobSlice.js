import { createSlice } from "@reduxjs/toolkit";

let userJobSlice = createSlice({
  name: "user",
  initialState: {
    allappliedjobs: [],
    searchedquery: "",
  },
  reducers: {
    setAllAppliedJobs: (state, action) => {
      state.allappliedjobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedquery = action.payload;
    },
  },
});

export const { setAllAppliedJobs, setSearchedQuery } = userJobSlice.actions;
export default userJobSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

let jobSlice = createSlice({
  name: "job",
  initialState: {
    alljobs: [],
    singlejob: null,
    searchedjobs: [],
    filtervalue: "",
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.alljobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singlejob = action.payload;
    },
    setSearchedJobs: (state, action) => {
      state.searchedjobs = action.payload;
    },
    setFilterValue: (state, action) => {
      state.filtervalue = action.payload;
    },
  },
});

export const { setAllJobs, setSingleJob, setSearchedJobs, setFilterValue } =
  jobSlice.actions;
export default jobSlice.reducer;

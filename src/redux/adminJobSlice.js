import { createSlice } from "@reduxjs/toolkit";

let adminJobSlice = createSlice({
  name: "company",
  initialState: {
    alladminjobs: [],
    searchjobbytext: "",
    applicants: [],
    numberofapplicants: 0,
  },
  reducers: {
    setAllAdminJobs: (state, action) => {
      state.alladminjobs = action.payload;
    },
    setSearchAdminJobs: (state, action) => {
      state.searchjobbytext = action.payload;
    },
    setApplicants: (state, action) => {
      state.applicants = action.payload;
    },
    setNumberOfApplicants: (state, action) => {
      state.numberofapplicants = action.payload;
    },
  },
});

export const {
  setAllAdminJobs,
  setSearchAdminJobs,
  setApplicants,
  setNumberOfApplicants,
} = adminJobSlice.actions;
export default adminJobSlice.reducer;

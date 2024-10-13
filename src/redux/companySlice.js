import { createSlice } from "@reduxjs/toolkit";

let companySlice = createSlice({
  name: "company",
  initialState: {
    allcompanys: [],
    singlecompany: null,
    searchbytext: "",
  },
  reducers: {
    setCompany: (state, action) => {
      state.singlecompany = action.payload;
    },
    setAllCompanies: (state, action) => {
      state.allcompanys = action.payload;
    },
    setSearchByText: (state, action) => {
      state.searchbytext = action.payload;
    },
  },
});

export const { setCompany, setAllCompanies, setSearchByText } =
  companySlice.actions;
export default companySlice.reducer;

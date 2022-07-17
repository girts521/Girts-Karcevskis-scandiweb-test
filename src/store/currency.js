import { createSlice } from "@reduxjs/toolkit";

const initialCurrencyState = { selectedCurrency: 0 };

const currencySlice = createSlice({
  name: "cart",
  initialState: initialCurrencyState,
  reducers: {
    setCurrency(state, action) {
      state.selectedCurrency = action.payload;
      localStorage.setItem("selectedCurrency", JSON.stringify(action.payload));
    },
  },
});

export const currencyActions = currencySlice.actions;

export default currencySlice.reducer;

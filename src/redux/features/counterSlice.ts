import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 0
}

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCounter: (state, action) => action.payload,
    incrementCounter: (state,action) => {
      state.counter += 1
    },
    decrementCounter: (state,action) => {
      state.counter -= 1
    }
  }

})

export const { setCounter,incrementCounter,decrementCounter } = counterSlice.actions;

export default counterSlice.reducer;
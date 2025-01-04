import { createSlice } from "@reduxjs/toolkit";

export type CounterState = {
  data: number;
};

const initialState: CounterState = {
  data: 42,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.data += action.payload; // uses library immer to mutate the state
    },
    decrement: (state, action) => {
      state.data -= action.payload;
    },
  },
});

export function increment(amount = 1) {
  return { type: "increment", payload: amount };
}

export function decrement(amount = 1) {
  return { type: "decrement", payload: amount };
}

export default function counterReducer(
  state = initialState,
  action: { type: string; payload: number }
) {
  switch (action.type) {
    case "increment":
      return { ...state, data: state.data + action.payload }; // return a new state object don't mutate the old state
    case "decrement":
      return { ...state, data: state.data - action.payload };
    default:
      return state;
  }
}

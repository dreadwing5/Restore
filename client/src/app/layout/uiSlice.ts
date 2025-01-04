import { createSlice } from "@reduxjs/toolkit";

const getInitialDarkMode = () => {
  const storedDarkMode = localStorage.getItem("darkMode");
  return storedDarkMode ? JSON.parse(storedDarkMode) : false;
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isLoading: false,
    darkMode: getInitialDarkMode(),
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
    },
  },
});

export const { startLoading, stopLoading, toggleDarkMode } = uiSlice.actions;

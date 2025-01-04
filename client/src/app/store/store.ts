import { legacy_createStore } from "@reduxjs/toolkit";
import counterReducer from "../../features/contact/conterReducer";

export function configureTheStore() {
  return legacy_createStore(counterReducer);
}

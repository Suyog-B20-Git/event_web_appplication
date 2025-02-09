import { configureStore } from "@reduxjs/toolkit";
import organiserReducer from "../slice/organiserSlice";
const store = configureStore({
  reducer: {
    organiser: organiserReducer,
  },
});

export default store;

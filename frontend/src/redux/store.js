import { configureStore } from "@reduxjs/toolkit";
import user from "./authSlice";
export const store = configureStore({
  reducer: {
    auth: user,
  },
});

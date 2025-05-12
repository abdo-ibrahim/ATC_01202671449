import { configureStore } from "@reduxjs/toolkit";
import BookingSlice from "../slices/BookingSlice";

export const store = configureStore({
  reducer: {
    booking: BookingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

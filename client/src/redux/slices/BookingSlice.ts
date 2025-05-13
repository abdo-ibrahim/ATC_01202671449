import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { MyBookingProps } from "../../Types/Booking";
import axios from "axios";
import { bookingURL } from "@/api/api";
import toast from "react-hot-toast";
import i18n from "@/i18n";

interface BookingState {
  bookings: MyBookingProps[];
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  loading: false,
  error: null,
};

export const fetchUserBookings = createAsyncThunk("bookings/fetchUserBookings", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${bookingURL}/getAllBookings`, {
      withCredentials: true,
      headers: {
        "accept-language": i18n.language,
      },
    });
    return response.data.data.bookings;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message || "Failed to fetch bookings");
    }
    return rejectWithValue("An unknown error occurred");
  }
});

// Delete a booking
export const deleteBooking = createAsyncThunk("bookings/deleteBooking", async (bookingId: string, { rejectWithValue }) => {
  try {
    await axios.delete(`${bookingURL}/deleteBooking/${bookingId}`, {
      withCredentials: true,
    });
    toast.success(i18n.language === "en" ? "Booking cancelled successfully!" : "تم إلغاء الحجز بنجاح!");
    return bookingId;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message || "Failed to cancel booking");
      return rejectWithValue(error.response?.data.message || "Failed to cancel booking");
    }
    toast.error("An unknown error occurred");
    return rejectWithValue("An unknown error occurred");
  }
});

export const createBooking = createAsyncThunk("bookings/createBooking", async (eventId: string, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post(
      `${bookingURL}/createBooking`,
      { eventId },
      {
        withCredentials: true,
        headers: {
          "accept-language": i18n.language,
        },
      }
    );
    toast.success(i18n.language === "en" ? "Event booked successfully!" : "تم حجز الحدث بنجاح!");
    dispatch(fetchUserBookings());
    return response.data.data.booking;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message || "Failed to book event");
      return rejectWithValue(error.response?.data.message || "Failed to book event");
    }
    toast.error("An unknown error occurred");
    return rejectWithValue("An unknown error occurred");
  }
});

const BookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Bookings Cases
    builder.addCase(fetchUserBookings.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserBookings.fulfilled, (state, action: PayloadAction<MyBookingProps[]>) => {
      state.loading = false;
      state.bookings = action.payload;
    });
    builder.addCase(fetchUserBookings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(deleteBooking.fulfilled, (state, action) => {
      state.bookings = state.bookings.filter((booking) => booking._id !== action.payload);
    });
  },
});

export default BookingSlice.reducer;

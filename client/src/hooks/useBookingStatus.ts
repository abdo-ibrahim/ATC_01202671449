import { useAppSelector } from "@/hooks/useReduxHooks";

export const useBookingStatus = (eventId: string) => {
  const { bookings } = useAppSelector((state) => state.booking);

  const isEventBooked = Array.isArray(bookings) && bookings.length > 0 && bookings.some((booking) => booking?.event?._id === eventId);

  return { isEventBooked };
};

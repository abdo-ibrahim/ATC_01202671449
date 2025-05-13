import { useEffect } from "react";
import BookingHeading from "@/components/MyBookings/BookingHeading";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MdOutlineDateRange } from "react-icons/md";
import BookingsList from "@/components/MyBookings/BookingsList";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchUserBookings } from "@/redux/slices/BookingSlice";
import LoadingSkeleton from "@/components/utils/LoadingSkeleton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
const MyBookings = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { bookings, loading: bookingLoading } = useAppSelector((state) => state.booking);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }
    }
    dispatch(fetchUserBookings());
  }, [dispatch, isAuthenticated, navigate, authLoading]);
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      dispatch(fetchUserBookings());
    }
  }, [authLoading, isAuthenticated, dispatch]);
  if (!isAuthenticated) {
    return null;
  }
  if (authLoading || bookingLoading) {
    return <LoadingSkeleton />;
  }
  return (
    <div className="py-12 min-h-[calc(100vh-147px)]">
      <BookingHeading />
      {bookings && bookings.length > 0 ? (
        <BookingsList bookings={bookings} />
      ) : (
        <div className="container text-center mt-20 rounded-lg p-8 bg-gray-50">
          <MdOutlineDateRange size={56} className="text-primary text-center mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-center mb-4">{t("myBookings.noBookings")}</h2>
          <p className="mb-4">{t("myBookings.noBookingsMessage")}</p>
          <Button>
            <Link to={"/"}> {t("myBookings.browseEvents")}</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyBookings;

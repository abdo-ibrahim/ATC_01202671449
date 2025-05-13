import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { MdOutlineDateRange } from "react-icons/md";
import { Link } from "react-router-dom";

const BookingSuccess = () => {
  const { t } = useTranslation();
  return (
    <div className="py-12 min-h-[calc(100vh-147px)] bg-gray-100  flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md flex flex-col items-center justify-center">
        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mx-auto mb-6">
          <MdOutlineDateRange size={40} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-primary mb-4">{t("bookingSuccess.title")}</h1>
        <p className="text-secondary mb-4 text-center">{t("bookingSuccess.message")}</p>
        <div className="flex items-center gap-3">
          <Button>
            <Link to={"/"}> {t("bookingSuccess.browseMore")}</Link>
          </Button>
          <Button variant="outline">
            <Link to={"/my-bookings"}>{t("bookingSuccess.viewBookings")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;

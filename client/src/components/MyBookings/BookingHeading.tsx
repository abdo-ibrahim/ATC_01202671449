import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { MdOutlineDateRange } from "react-icons/md";
import { Link } from "react-router-dom";

const BookingHeading = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <div className="heading flex justify-between items-center mb-12 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <MdOutlineDateRange size={26} className="text-primary" />
          <h2 className="text-3xl font-bold">{t("myBookings.title")}</h2>
        </div>
        <Button>
          <Link to={"/"}>{t("myBookings.browseEvents")}</Link>
        </Button>
      </div>
    </div>
  );
};

export default BookingHeading;

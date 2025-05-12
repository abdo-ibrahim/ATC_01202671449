import { Button } from "@/components/ui/button";
import { MdOutlineDateRange } from "react-icons/md";
import { Link } from "react-router-dom";

const BookingHeading = () => {
  return (
    <div className="container">
      <div className="heading flex justify-between items-center mb-12 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <MdOutlineDateRange size={26} className="text-primary" />
          <h2 className="text-3xl font-bold">My Bookings</h2>
        </div>
        <Button>
          <Link to={"/"}> Browse Events</Link>
        </Button>
      </div>
    </div>
  );
};

export default BookingHeading;

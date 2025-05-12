import { Button } from "../ui/button";
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineDateRange } from "react-icons/md";
import { Link } from "react-router-dom";
import { EventProps } from "../../Types/Booking";
import { FaPoundSign } from "react-icons/fa";
import { useBookingStatus } from "@/hooks/useBookingStatus";
import { useAuth } from "@/hooks/useAuth";

const EventCard = ({ event }: { event: EventProps }) => {
  const { isEventBooked } = useBookingStatus(event._id);
  const { isAuthenticated } = useAuth();
  return (
    <div className="event-card relative">
      <div className="category absolute btn-primary right-4 top-2 px-2 !py-1 rounded-full text-sm">{event.category}</div>
      <Link to={`/events/${event._id}`}>
        <div className="event-card-image cursor-pointer h-[350px] w-full overflow-hidden">
          <img src={event.imageUrl} alt="Event" className="h-full w-full object-cover" />
        </div>
        <div className="event-card-content p-4">
          <h3 className="text-xl mb-1">{event.name}</h3>
          <div className="flex items-center gap-2 text-secondary mb-1">
            <MdOutlineDateRange />
            {new Date(event.eventDate).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2 text-secondary mb-2">
            <SlLocationPin />
            {event.venue}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center font-bold text-lg gap-[2px]">
              {event?.price && event.price > 0 ? (
                <div className="flex items-center text-lg gap-[2px]">
                  <span>{event?.price}</span> <FaPoundSign />
                </div>
              ) : (
                <span className="text-green-700 text-semibold">Free</span>
              )}
            </div>
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        {isAuthenticated && isEventBooked ? (
          <Button size="sm" variant="outline" disabled className="w-full">
            Booked
          </Button>
        ) : (
          <Link to={`/events/${event._id}`} className="w-full block">
            <Button size="sm" className="w-full">
              Book Now
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default EventCard;

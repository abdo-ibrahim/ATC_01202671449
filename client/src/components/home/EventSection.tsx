import EventCard from "./EventCard";
import { EventProps } from "@/Types/Booking";
import LoadingSkeleton from "../utils/LoadingSkeleton";
import i18n from "@/i18n";
interface EventSectionProps {
  events: EventProps[];
  loading: boolean;
}

const EventSection = ({ events, loading }: EventSectionProps) => {
  if (loading) {
    return <LoadingSkeleton />;
  }
  return (
    <div className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8">{i18n.language === "ar" ? "الأحداث القادمة" : "Upcoming Events"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events && events.length > 0 ? (
            events.map((event: EventProps) => <EventCard key={event._id} event={event} />)
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <p className="text-center text-gray-500">{i18n.language === "ar" ? "لا توجد أحداث متاحة في الوقت الحالي." : "No events available at the moment."}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventSection;

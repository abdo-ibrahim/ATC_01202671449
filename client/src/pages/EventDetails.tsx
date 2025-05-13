import { Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlineDateRange, MdPriceChange } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { CiShoppingTag } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { EventProps } from "@/Types/Booking";
import { eventURL } from "@/api/api";
import LoadingSkeleton from "@/components/utils/LoadingSkeleton";
import axios from "axios";
import { FaPoundSign } from "react-icons/fa";
import toast from "react-hot-toast";
import Cookie from "js-cookie";
import { useBookingStatus } from "@/hooks/useBookingStatus";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { createBooking } from "@/redux/slices/BookingSlice";
import { useAuth } from "@/hooks/useAuth";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";

const EventDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventProps | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  const { isEventBooked } = useBookingStatus(id || "");

  const token = Cookie.get("token");
  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${eventURL}/getEventById/${id}`, {
          headers: {
            "accept-language": i18n.language,
          },
        });
        if (response.status === 200) {
          setEvent(response.data.data.event);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [id, token, isAuthenticated]);
  if (loading) {
    return <LoadingSkeleton />;
  }

  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast.error(t("eventDetails.loginPrompt"));
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }

    if (isEventBooked) {
      toast.error(t("eventDetails.alreadyBooked"));
      return;
    }

    setIsLoadingButton(true);
    try {
      await dispatch(createBooking(id || "")).unwrap();
      setTimeout(() => {
        navigate("/booking-success");
      }, 1000);
    } catch (error) {
      console.error("Error booking event:", error);
    } finally {
      setIsLoadingButton(false);
    }
  };

  return (
    <div className="py-12 min-h-[calc(100vh-147px)]">
      <div className="container">
        <Link to={"/"} className="flex items-center gap-2 text-gray-600 hover:text-gray-700">
          <IoArrowBack />
          {t("eventDetails.backToEvents")}
        </Link>
        <div className="event-details mt-4">
          <div className="event-image h-[500px] max-w-[600px] rounded-lg ">
            <img src={event?.imageUrl} alt="Event" className="w-full h-full object-cover" />
          </div>
          <div className="event-info mt-4">
            <h2 className="text-3xl mb-6">{event?.name}</h2>
            <div className="details grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[600px] mb-6">
              <div className="flex items-center gap-2 text-lg">
                <MdOutlineDateRange className="text-primary" />
                {event?.eventDate ? new Date(event.eventDate).toISOString().split("T")[0] : "Date not available"}
              </div>
              <div className="flex items-center gap-2 text-lg">
                <CiShoppingTag className="text-primary" />
                {event?.category}
              </div>
              <div className="flex items-center gap-2 text-lg">
                <SlLocationPin className="text-primary" />
                {event?.venue}
              </div>
              <div className="flex items-center gap-2 text-lg">
                <MdPriceChange className="text-primary" />
                {event?.price && event.price > 0 ? (
                  <div className="flex items-center text-lg gap-[2px]">
                    <span>{event?.price}</span> {i18n.language === "en" ? <FaPoundSign /> : "جنيه "}
                  </div>
                ) : (
                  <span className="text-green-700 text-semibold">{i18n.language === "en" ? "Free" : "مجاني"}</span>
                )}
              </div>
            </div>
            <div className="mb-3 text-lg">
              <h3 className="text-2xl mb-3">{t("eventDetails.aboutEvent")}</h3>
              <p className="max-w-[600px] text-secondary">{event?.description}</p>
            </div>
            <div className="max-w-[600px]">
              <Button size="sm" className="w-full" onClick={handleBooking} disabled={isLoadingButton || isEventBooked}>
                {isLoadingButton ? <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div> : isEventBooked ? t("eventDetails.booked") : t("eventDetails.bookNow")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;

import { ReactNode, useState, useCallback, useEffect } from "react";
import axios from "axios";
import { eventURL } from "@/api/api";
import { EventProps } from "@/Types/Booking";
import { EventContext } from "./EventContextTypes";
import i18n from "@/i18n";

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState(true);

  const getAllEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${eventURL}/getAllEvents`, {
        headers: {
          "accept-language": i18n.language,
        },
      });
      setEvents(res.data.data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  return <EventContext.Provider value={{ events, loading, getAllEvents }}>{children}</EventContext.Provider>;
};

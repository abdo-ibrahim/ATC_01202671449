import { createContext } from "react";
import { EventProps } from "@/Types/Booking";

export interface EventContextType {
  events: EventProps[];
  loading: boolean;
  getAllEvents: () => Promise<void>;
}

export const EventContext = createContext<EventContextType | undefined>(undefined);

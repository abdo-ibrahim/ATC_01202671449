import { useContext } from "react";
import { EventContext, EventContextType } from "@/contexts/EventContextTypes";

export const useEvents = (): EventContextType => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
};

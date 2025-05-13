import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import EditEvent from "./EditEvent";
import DeleteEvent from "./DeleteEvent";
import { FaPoundSign } from "react-icons/fa";
import { useEvents } from "@/hooks/useEvents";
import { EventProps } from "@/Types/Booking";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";

const EventsList = () => {
  const { t } = useTranslation();
  const { events } = useEvents();
  console.log("events", events);
  return (
    <div className="container rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("dashboard.table.eventName")}</TableHead>
            <TableHead>{t("dashboard.table.date")}</TableHead>
            <TableHead>{t("dashboard.table.venue")}</TableHead>
            <TableHead>{t("dashboard.table.category")}</TableHead>
            <TableHead className="text-right">{t("dashboard.table.price")}</TableHead>
            <TableHead className="text-right">{t("dashboard.table.actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                {t("dashboard.noEvents")}
              </TableCell>
            </TableRow>
          ) : (
            events.map((event: EventProps, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{event.name}</TableCell>
                <TableCell>{new Date(event.eventDate).toISOString().split("T")[0]}</TableCell>
                <TableCell>{event.venue}</TableCell>
                <TableCell>{event.category}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {event.price > 0 ? (
                      <>
                        {event.price.toFixed(2)}
                        {i18n.language === "en" ? <FaPoundSign size={14} /> : "جنيه "}
                      </>
                    ) : (
                      <span className="text-green-700 text-semibold">{i18n.language === "en" ? "Free" : "مجاني"}</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right flex items-center justify-end gap-2">
                  <EditEvent eventId={event._id} />
                  <DeleteEvent event={event} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EventsList;

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import EditEvent from "./EditEvent";
import DeleteEvent from "./DeleteEvent";
import { FaPoundSign } from "react-icons/fa";
import { useEvents } from "@/hooks/useEvents";
import { EventProps } from "@/Types/Booking";

const EventsList = () => {
  const { events } = useEvents();
  return (
    <div className="container rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Venue</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No Events found
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
                        <FaPoundSign size={14} />
                      </>
                    ) : (
                      <span className="text-green-700 text-semibold">Free</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right flex items-center justify-end gap-2">
                  <EditEvent event={event} />
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

import { MyBookingProps } from "../../Types/Booking";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { deleteBooking } from "@/redux/slices/BookingSlice";
import { useState } from "react";
import { FaPoundSign } from "react-icons/fa";
import i18n from "@/i18n";
import { t } from "i18next";

const BookingsList = ({ bookings }: { bookings: MyBookingProps[] }) => {
  const dispatch = useAppDispatch();
  const [cancellingIds, setCancellingIds] = useState<string[]>([]);

  const handleCancelBooking = async (id: string) => {
    setCancellingIds([...cancellingIds, id]);
    await dispatch(deleteBooking(id));
    setCancellingIds(cancellingIds.filter((bookingId) => bookingId !== id));
  };
  return (
    <div className="container rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("myBookings.eventName")}</TableHead>
            <TableHead>{t("myBookings.date")}</TableHead>
            <TableHead>{t("myBookings.venue")}</TableHead>
            <TableHead>{t("myBookings.category")}</TableHead>
            <TableHead className="text-right">{t("myBookings.price")}</TableHead>
            <TableHead className="text-right">{t("myBookings.actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                {t("myBookings.noBookings")}
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell className="font-medium">{booking.event.name}</TableCell>
                <TableCell>{new Date(booking.event.eventDate).toLocaleDateString()}</TableCell>
                <TableCell>{booking.event.venue}</TableCell>
                <TableCell>{booking.event.category}</TableCell>
                <TableCell className="text-right">
                  {booking.event?.price && booking.event.price > 0 ? (
                    <div className="flex items-center gap-[4px]">
                      <span>{booking.event.price}</span> {i18n.language === "en" ? <FaPoundSign /> : "جنيه "}
                    </div>
                  ) : (
                    <span className="text-green-700 text-semibold">{i18n.language === "en" ? "Free" : "مجاني"}</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="destructive" size="sm" className="cursor-pointer" onClick={() => handleCancelBooking(booking._id)} disabled={cancellingIds.includes(booking._id)}>
                    {cancellingIds.includes(booking._id) ? (
                      t("myBookings.cancelling") + "..."
                    ) : (
                      <>
                        <X className="h-4 w-4 mr-1" /> {t("myBookings.cancel")}
                      </>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingsList;

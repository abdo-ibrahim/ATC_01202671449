import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { MdDeleteOutline } from "react-icons/md";
import { EventProps } from "@/Types/Booking";
import { eventURL } from "@/api/api";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { useEvents } from "@/hooks/useEvents";
import { useTranslation } from "react-i18next";

interface DeleteEventProps {
  event: EventProps;
}

const DeleteEvent = ({ event }: DeleteEventProps) => {
  const { t } = useTranslation();
  const { getAllEvents } = useEvents();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleDeleteEvent = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`${eventURL}/deleteEvent/${event._id}`, {
        withCredentials: true,
      });
      if (response.data.status === "success") {
        toast.success(t("dashboard.deleteEventModal.success"));
        setOpen(false);
        await getAllEvents();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(t("dashboard.deleteEventModal.error"));
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm" className="cursor-pointer">
          <MdDeleteOutline size={26} className="text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("dashboard.deleteEventModal.title")}</DialogTitle>
          <DialogDescription>{`${t("dashboard.deleteEventModal.description")} ${event.name}`}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>{t("dashboard.deleteEventModal.cancelButton")}</Button>
          </DialogClose>
          <Button variant={"destructive"} className="text-white" onClick={handleDeleteEvent} disabled={isLoading}>
            {isLoading ? t("dashboard.deleteEventModal.deleting") : t("dashboard.deleteEventModal.deleteButton")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEvent;

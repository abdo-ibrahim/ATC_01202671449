import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { MdDeleteOutline } from "react-icons/md";
import { EventProps } from "@/Types/Booking";
import { eventURL } from "@/api/api";
import toast from "react-hot-toast";
import Cookie from "js-cookie";
import axios from "axios";
import { useState } from "react";
import { useEvents } from "@/hooks/useEvents";

interface DeleteEventProps {
  event: EventProps;
}

const DeleteEvent = ({ event }: DeleteEventProps) => {
  const { getAllEvents } = useEvents();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const token = Cookie.get("token");
  const handleDeleteEvent = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`${eventURL}/deleteEvent/${event._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status === "success") {
        toast.success("Event deleted successfully!");
        setOpen(false);
        await getAllEvents();
      }
    } catch (error) {
      console.error("Error deleting event:", error);
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
          <DialogTitle>Are You Sure?</DialogTitle>
          <DialogDescription>{`This action cannot be undone. This will permanently delete ${event.name} and remove it from our servers.`}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button variant={"destructive"} className="text-white" onClick={handleDeleteEvent} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEvent;

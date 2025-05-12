import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { EventProps } from "@/Types/Booking";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import toast from "react-hot-toast";
import axios from "axios";
import { eventURL } from "@/api/api";
import { useEvents } from "@/hooks/useEvents";
interface EditEventProps {
  event: EventProps;
}

const EditEvent = ({ event }: EditEventProps) => {
  const { getAllEvents } = useEvents();
  const [name, setName] = useState(event.name);
  const [description, setDescription] = useState(event.description);
  const [eventDate, setEventDate] = useState(event.eventDate);
  const [venue, setVenue] = useState(event.venue);
  const [price, setPrice] = useState<number | string>(event.price);
  const [category, setCategory] = useState(event.category);
  const [image, setImage] = useState(event.imageUrl);
  const token = Cookie.get("token");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setName(event.name);
    setDescription(event.description);
    setEventDate(event.eventDate);
    setVenue(event.venue);
    setPrice(event.price);
    setCategory(event.category);
    setImage(event.imageUrl);
  }, [event]);
  const handleUpdateEvent = async () => {
    if (!name || !description || !eventDate || !venue || !price || !category) {
      toast.error("Please fill all required fields");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${eventURL}/updateEvent/${event._id}`,
        {
          name,
          description,
          eventDate,
          venue,
          price: Number(price),
          category,
          imageUrl: image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === "success") {
        toast.success("Event updated successfully!");
        setOpen(false);
        await getAllEvents();
      }
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="cursor-pointer">
          <MdOutlineModeEditOutline size={26} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Event</DialogTitle>
          <DialogDescription>Update the event details.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-1.5 mb-2">
            <Label htmlFor="name">Event Name</Label>
            <Input type="text" id="name" placeholder="Event Name" className="py-[20px]" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid items-center gap-1.5 mb-2">
            <Label htmlFor="description">Description</Label>
            <Input type="text" id="description" placeholder="Description" className="py-[20px]" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid items-center gap-1.5">
              <Label htmlFor="date">Date</Label>
              <Input type="date" id="date" className="py-[20px]" value={formatDateForInput(eventDate)} onChange={(e) => setEventDate(e.target.value)} />
            </div>
            <div className="grid items-center gap-1.5">
              <Label htmlFor="venue">Venue</Label>
              <Input type="text" id="venue" placeholder="venue" className="py-[20px]" value={venue} onChange={(e) => setVenue(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid items-center gap-1.5">
              <Label htmlFor="category">Category</Label>
              <Input type="text" id="category" placeholder="Gaming" className="py-[20px]" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div className="grid items-center gap-1.5">
              <Label htmlFor="price">Price (EG)</Label>
              <Input type="number" id="price" placeholder="200" className="py-[20px]" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>
          <div className="grid items-center gap-1.5 mb-2">
            <Label htmlFor="image">Image URL</Label>
            <Input type="text" id="image" placeholder="image url" className="py-[20px]" value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
        </div>
        <DialogFooter className="w-full">
          <Button type="submit" className="w-full" onClick={handleUpdateEvent} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Event"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditEvent;

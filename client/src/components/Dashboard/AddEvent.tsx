import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cookie from "js-cookie";
import { eventURL } from "@/api/api";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useEvents } from "@/hooks/useEvents";

const AddEvent = () => {
  const { getAllEvents } = useEvents();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [venue, setVenue] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const token = Cookie.get("token");
  const handleAddEvent = async () => {
    if (!name || !description || !eventDate || !venue || !price || !category) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      const response = await axios.post(
        `${eventURL}/createEvent`,
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
        toast.success("Event created successfully!");
        setOpen(false);
        setName("");
        setDescription("");
        setEventDate("");
        setVenue("");
        setPrice("");
        setCategory("");
        setImage("");
        await getAllEvents();
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 text-white">
          <FaPlus size={20} />
          Add New Event
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogDescription>Fill in the details to create a new event.</DialogDescription>
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
              <Input type="date" id="date" className="py-[20px]" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
            </div>
            <div className="grid items-center gap-1.5">
              <Label htmlFor="venue">Venue</Label>
              <Input type="text" id="venue" placeholder="venue" className="py-[20px]" value={venue} onChange={(e) => setVenue(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid items-center gap-1.5">
              <Label htmlFor="price">Price (EG)</Label>
              <Input type="number" id="price" placeholder="0.00" className="py-[20px]" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="grid items-center gap-1.5">
              <Label htmlFor="category">Category</Label>
              <Input type="text" id="category" placeholder="Gaming" className="py-[20px]" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
          </div>
          <div className="grid items-center gap-1.5 mb-2">
            <Label htmlFor="image">Image URL</Label>
            <Input type="text" id="image" placeholder="image url" className="py-[20px]" value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
        </div>
        <DialogFooter className="w-full">
          <Button type="submit" className="w-full" onClick={handleAddEvent} disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Event"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEvent;

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
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { useEvents } from "@/hooks/useEvents";

const EditEvent = ({ eventId }: { eventId: string }) => {
  const { t } = useTranslation();
  const [name, setName] = useState<{ en: string; ar: string }>({ en: "", ar: "" });
  const [description, setDescription] = useState<{ en: string; ar: string }>({ en: "", ar: "" });
  const [eventDate, setEventDate] = useState("");
  const [venue, setVenue] = useState<{ en: string; ar: string }>({ en: "", ar: "" });
  const [price, setPrice] = useState<number | string>(0);
  const [category, setCategory] = useState<{ en: string; ar: string }>({ en: "", ar: "" });
  const [image, setImage] = useState("");
  const token = Cookie.get("token");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { getAllEvents } = useEvents();
  const [event, setEvent] = useState<EventProps>({} as EventProps);
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${eventURL}/getEventById/${eventId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            getAllEvent: "true",
          },
        });
        setEvent(response.data.data.event);
        console.log("event is the ", response.data.data.event);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchEvent();
  }, [eventId, token]);
  useEffect(() => {
    setName(typeof event.name === "object" ? event.name : { en: String(event.name), ar: "" });
    setDescription(typeof event.description === "object" ? event.description : { en: String(event.description), ar: "" });
    setEventDate(event.eventDate);
    setVenue(typeof event.venue === "object" ? event.venue : { en: String(event.venue), ar: "" });
    setPrice(event.price);
    setCategory(typeof event.category === "object" ? event.category : { en: String(event.category), ar: "" });
    setImage(event.imageUrl);
  }, [event]);

  const handleChange = (field: string, lang: string, value: string) => {
    switch (field) {
      case "name":
        setName((prev) => ({ ...prev, [lang]: value }));
        break;
      case "description":
        setDescription((prev) => ({ ...prev, [lang]: value }));
        break;
      case "venue":
        setVenue((prev) => ({ ...prev, [lang]: value }));
        break;
      case "category":
        setCategory((prev) => ({ ...prev, [lang]: value }));
        break;
      default:
        break;
    }
  };

  const handleUpdateEvent = async () => {
    if (!name.en || !description.en || !eventDate || !venue.en || !price || !category.en) {
      toast.error(t("dashboard.editEventModal.requiredFields"));
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
        toast.success(t("dashboard.editEventModal.success"));
        setOpen(false);
        await getAllEvents();
      }
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error(t("dashboard.editEventModal.error"));
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
      <DialogContent className="max-w-[825px]">
        <DialogHeader className="mt-4">
          <DialogTitle className="text-2xl">{t("dashboard.editEventModal.title")}</DialogTitle>
          <DialogDescription className={`${i18n.language === "ar" ? "text-right" : "text-left"}`}>{t("dashboard.editEventModal.description")}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid items-center gap-1.5 mb-2">
              <Label htmlFor="name_en">Event Name</Label>
              <Input type="text" id="name_en" placeholder="AI Bootcamp" className="py-[20px]" value={name.en} onChange={(e) => handleChange("name", "en", e.target.value)} />
            </div>
            <div className="grid items-center gap-1.5 mb-2">
              <Label htmlFor="name_ar">اسم الحدث بالعربية</Label>
              <Input type="text" id="name_ar" placeholder="ذكاء اصطناعي" className="py-[20px]" value={name.ar} onChange={(e) => handleChange("name", "ar", e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid items-center gap-1.5 mb-2">
              <Label htmlFor="description_en">Description English</Label>
              <Input type="text" id="description_en" placeholder="Description" className="py-[20px]" value={description.en} onChange={(e) => handleChange("description", "en", e.target.value)} />
            </div>
            <div className="grid items-center gap-1.5 mb-2">
              <Label htmlFor="description_ar">الوصف بالعربية</Label>
              <Input type="text" id="description_ar" placeholder="وصف الحدث" className="py-[20px]" value={description.ar} onChange={(e) => handleChange("description", "ar", e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid items-center gap-1.5">
              <Label htmlFor="date">Date</Label>
              <Input type="date" id="date" className="py-[20px]" value={formatDateForInput(eventDate)} onChange={(e) => setEventDate(e.target.value)} />
            </div>
            <div className="grid items-center gap-1.5">
              <Label htmlFor="price">Price (EG)</Label>
              <Input type="number" id="price" placeholder="0.00" className="py-[20px]" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid items-center gap-1.5 mb-2">
              <Label htmlFor="venue_en">Venue English</Label>
              <Input type="text" id="venue_en" placeholder="Egypt" className="py-[20px]" value={venue.en} onChange={(e) => handleChange("venue", "en", e.target.value)} />
            </div>
            <div className="grid items-center gap-1.5 mb-2">
              <Label htmlFor="venue_ar">المكان بالعربية</Label>
              <Input type="text" id="venue_ar" placeholder="مصر" className="py-[20px]" value={venue.ar} onChange={(e) => handleChange("venue", "ar", e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid items-center gap-1.5 mb-2">
              <Label htmlFor="category_en">Category English</Label>
              <Input type="text" id="category_en" placeholder="Gaming" className="py-[20px]" value={category.en} onChange={(e) => handleChange("category", "en", e.target.value)} />
            </div>
            <div className="grid items-center gap-1.5 mb-2">
              <Label htmlFor="category_ar">الفئة بالعربية</Label>
              <Input type="text" id="category_ar" placeholder="العاب" className="py-[20px]" value={category.ar} onChange={(e) => handleChange("category", "ar", e.target.value)} />
            </div>
          </div>

          <div className="grid items-center gap-1.5 mb-2">
            <Label htmlFor="image">Image URL</Label>
            <Input type="text" id="image" placeholder="image url" className="py-[20px]" value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
        </div>
        <DialogFooter className="w-full">
          <Button type="submit" className="w-full" onClick={handleUpdateEvent} disabled={isLoading}>
            {isLoading ? t("dashboard.editEventModal.updating") : t("dashboard.editEventModal.updateButton")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditEvent;

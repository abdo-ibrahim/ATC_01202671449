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
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";

const AddEvent = () => {
  const { t } = useTranslation();

  const { getAllEvents } = useEvents();
  const [name, setName] = useState({ en: "", ar: "" });
  const [description, setDescription] = useState({ en: "", ar: "" });
  const [eventDate, setEventDate] = useState("");
  const [venue, setVenue] = useState({ en: "", ar: "" });
  const [price, setPrice] = useState<number | string>("");
  const [category, setCategory] = useState({ en: "", ar: "" });
  const [image, setImage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const token = Cookie.get("token");
  const handleAddEvent = async () => {
    if (!name.en || !description.en || !eventDate || !venue.en || !price || !category.en) {
      toast.error(t("dashboard.addEventModal.requiredFields"));
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
            "accept-language": i18n.language,
          },
        }
      );
      if (response.data.status === "success") {
        toast.success(t("dashboard.addEventModal.success"));
        setOpen(false);
        setName({ en: "", ar: "" });
        setDescription({ en: "", ar: "" });
        setEventDate("");
        setVenue({ en: "", ar: "" });
        setPrice("");
        setCategory({ en: "", ar: "" });
        setImage("");
        await getAllEvents();
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error(t("dashboard.addEventModal.error"));
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild >
        <Button className="flex items-center gap-2 text-white">
          <FaPlus size={20} />
          {t("dashboard.addEventModal.title")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[825px]">
        <DialogHeader className="mt-4">
          <DialogTitle>{t("dashboard.addEventModal.title")}</DialogTitle>
          <DialogDescription className={`${i18n.language === "ar" ? "text-right" : "text-left"}`}>{t("dashboard.addEventModal.description")}</DialogDescription>
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
              <Input type="date" id="date" className="py-[20px]" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
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
            <Label htmlFor="image">{t("dashboard.addEventModal.imageUrl")}</Label>
            <Input type="text" id="image" placeholder="image url" className="py-[20px]" value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
        </div>
        <DialogFooter className="w-full">
          <Button type="submit" className="w-full" onClick={handleAddEvent} disabled={isLoading}>
            {isLoading ? t("dashboard.addEventModal.adding") : t("dashboard.addEventModal.addButton")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEvent;

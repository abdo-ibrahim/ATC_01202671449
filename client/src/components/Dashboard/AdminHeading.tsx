import { BiCategory } from "react-icons/bi";
import AddEvent from "./AddEvent";
import { useTranslation } from "react-i18next";

const AdminHeading = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <div className="heading flex justify-between items-center mb-12 flex-wrap gap-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <BiCategory size={26} className="text-primary" />
            <h2 className="text-3xl font-bold">{t("dashboard.title")}</h2>
          </div>
          <p>{t("dashboard.description")}</p>
        </div>
        <AddEvent />
      </div>
    </div>
  );
};

export default AdminHeading;

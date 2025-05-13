import i18n from "@/i18n";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-50 border-t py-6 mt-auto">
      <div className={`container flex justify-center items-center ${i18n.language === "ar" ? "flex-row-reverse" : "flex-row"} text-center`}>
        &copy; {new Date().getFullYear()} <span className=" mx-1 font-[display] text-primary font-bold text-lg"> AreebEvent</span>
        <span className="mx-1 text-secondary">{t("footer.copyright")}</span>
      </div>
    </footer>
  );
};

export default Footer;

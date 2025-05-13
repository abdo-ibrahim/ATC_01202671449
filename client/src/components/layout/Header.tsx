import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import "./Header.css";
import { FiLogIn } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { CgMenuRightAlt, CgClose } from "react-icons/cg";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import { useAuth } from "@/hooks/useAuth";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import Cookie from "js-cookie";

const LanguageSwitcher = () => {
  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center justify-center min-w-[40px] font-medium"
      onClick={() => {
        i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
        window.location.reload();
      }}>
      {i18n.language === "ar" ? "EN" : "عربي"}
    </Button>
  );
};

const Header = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const token = Cookies.get("token");
  const token2 = Cookie.get("token");
  console.log("token", token);
  console.log("token2", token2);
  console.log("user", user);
  console.log("isAuthenticated", isAuthenticated);

  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <header className="relative z-50">
      <div className="container flex items-center justify-between min-h-[70px]">
        <Link to="/">
          <h1 className="logo text-primary !font-['Playfair Display'] text-2xl sm:text-3xl">AreebEvent</h1>
        </Link>

        <button className="text-3xl cursor-pointer md:hidden z-50" onClick={toggleMenu}>
          {open ? <CgClose /> : <CgMenuRightAlt />}
        </button>

        <div className="hidden md:flex items-center justify-between flex-1 ml-8">
          <nav className="flex items-center justify-center flex-1">
            <ul className="flex items-center gap-6 text-md font-medium">
              <li className="fill">
                <Link to="/">{t("header.events")}</Link>
              </li>
              {isAuthenticated && (
                <li className="fill">
                  <Link to="/my-bookings">{t("header.myBookings")}</Link>
                </li>
              )}
              {isAuthenticated && user?.role === "admin" && (
                <li className="fill">
                  <Link to="/dashboard">{t("header.dashboard")}</Link>
                </li>
              )}
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            {isAuthenticated && user?.name && (
              <p className="text-lg font-semibold flex items-center gap-2 text-primary">
                <FaRegUserCircle /> {user.name}
              </p>
            )}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={logout}>
                  <FiLogIn />
                  {t("header.logout")}
                </Button>
              </div>
            ) : (
              <>
                <LanguageSwitcher />
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <FiLogIn />
                  <Link to="/login">{t("header.login")}</Link>
                </Button>
                <Button size="sm" className="flex items-center gap-2">
                  <FaRegUserCircle />
                  <Link to="/register">{t("header.register")}</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        <MobileMenu isOpen={open} isAuthenticated={isAuthenticated} toggleMenu={toggleMenu} logout={logout} userRole={user?.role} userName={user?.name} />
      </div>
    </header>
  );
};

export default Header;

import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import "./Header.css";
import { FiLogIn } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { CgMenuRightAlt, CgClose } from "react-icons/cg";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

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
          <h1 className="text-primary font-['Playfair Display'] text-2xl sm:text-3xl">AreebEvent</h1>
        </Link>

        <button className="text-3xl cursor-pointer md:hidden z-50" onClick={toggleMenu}>
          {open ? <CgClose /> : <CgMenuRightAlt />}
        </button>

        <div className="hidden md:flex items-center justify-between flex-1 ml-8">
          <nav className="flex items-center justify-center flex-1">
            <ul className="flex items-center gap-4 text-md">
              <li className="fill">
                <Link to="/">Events</Link>
              </li>
              {isAuthenticated && (
                <li className="fill">
                  <Link to="/my-bookings">My Bookings</Link>
                </li>
              )}
              {isAuthenticated && user?.role === "admin" && (
                <li className="fill">
                  <Link to="/dashboard">Dashboard</Link>
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
              <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={logout}>
                <FiLogIn />
                Logout
              </Button>
            ) : (
              <>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <FiLogIn />
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" className="flex items-center gap-2">
                  <FaRegUserCircle />
                  <Link to="/register">Register</Link>
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

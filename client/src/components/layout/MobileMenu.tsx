import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { FiLogIn } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";

interface MobileMenuProps {
  isOpen: boolean;
  isAuthenticated: boolean;
  toggleMenu: () => void;
  logout: () => void;
  userRole?: string;
  userName?: string; // Add userName prop
}

const MobileMenu = ({ isOpen, isAuthenticated, toggleMenu, logout, userRole, userName }: MobileMenuProps) => {
  return (
    <div className={`md:hidden fixed left-0 top-[70px] w-full h-screen bg-gradient-to-b from-[#A855F7] to-[#3D81F6] z-40 overflow-hidden transition-all duration-100 ease-in-out ${isOpen ? "max-h-screen pt-8" : "max-h-0"}`}>
      <div className="container flex flex-col">
        {/* Welcome message */}
        {isAuthenticated && userName && (
          <div className="text-white text-center mb-6 pb-2 border-b border-white/20">
            <p className="text-xl font-semibold flex items-center gap-2 justify-center pb-2 font-['Playfair Display']">
              {" "}
              <FaRegUserCircle /> {userName}
            </p>
          </div>
        )}

        <nav>
          <ul className="flex flex-col gap-4 text-xl text-center text-white">
            <li onClick={toggleMenu} className="py-2 hover:bg-white hover:text-primary hover:pl-4 transition-all duration-100">
              <Link to="/">Events</Link>
            </li>
            {isAuthenticated && (
              <li onClick={toggleMenu} className="py-2 hover:bg-white hover:text-primary hover:pl-4 transition-all duration-100">
                <Link to="/my-bookings">My Bookings</Link>
              </li>
            )}
            {isAuthenticated && userRole === "admin" && (
              <li onClick={toggleMenu} className="py-2 hover:bg-white hover:text-primary hover:pl-4 transition-all duration-100">
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
          </ul>
        </nav>
        <div className="flex flex-col gap-3 mt-8">
          {isAuthenticated ? (
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => {
                logout();
                toggleMenu();
              }}>
              <FiLogIn />
              Logout
            </Button>
          ) : (
            <>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={toggleMenu}>
                <FiLogIn />
                <Link to="/login" className="w-full">
                  Login
                </Link>
              </Button>
              <Button className="w-full flex items-center justify-center gap-2" onClick={toggleMenu}>
                <FaRegUserCircle />
                <Link to="/register" className="w-full">
                  Register
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

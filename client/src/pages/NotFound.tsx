import { Button } from "@/components/ui/button";
import { MdErrorOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="py-12 min-h-[calc(100vh-147px)] bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md flex flex-col items-center justify-center">
        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mx-auto mb-6">
          <MdErrorOutline size={40} className="text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-primary mb-4">Page Not Found</h1>
        <p className="text-secondary mb-4 text-center">The page you are looking for doesn't exist or has been moved.</p>
        <div className="flex items-center gap-3">
          <Button>
            <Link to="/"> Back to Home</Link>
          </Button>
          <Button variant="outline">
            <Link to="/my-bookings"> View My Bookings</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

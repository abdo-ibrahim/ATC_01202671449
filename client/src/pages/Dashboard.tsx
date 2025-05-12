import { MdOutlineDateRange } from "react-icons/md";
import AdminHeading from "@/components/Dashboard/AdminHeading";
import EventsList from "@/components/Dashboard/EventsList";
import LoadingSkeleton from "@/components/utils/LoadingSkeleton";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "@/hooks/useEvents";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { loading: eventsLoading, events, getAllEvents } = useEvents();
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }
      if (user?.role !== "admin") {
        navigate("/");
        return;
      }
    }
  }, [authLoading, isAuthenticated, user, navigate]);
  useEffect(() => {
    if (!authLoading && isAuthenticated && user?.role === "admin") {
      getAllEvents();
    }
  }, [authLoading, isAuthenticated, user, getAllEvents]);
  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }
  if (authLoading || eventsLoading) {
    return <LoadingSkeleton />;
  }
  return (
    <div className="py-12 min-h-[calc(100vh-147px)]">
      <AdminHeading />
      {events && events.length > 0 ? (
        <EventsList />
      ) : (
        <div className="container text-center mt-20 rounded-lg p-8 bg-gray-50">
          <MdOutlineDateRange size={56} className="text-primary text-center mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-center mb-4">No Events Found</h2>
          <p className="mb-4">You haven't any events yet. Add Event Now!</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EventDetails from "./pages/EventDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyBookings from "./pages/MyBookings";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import BookingSuccess from "./pages/BookingSuccess";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import { EventProvider } from "./contexts/EventContext";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./hooks/useReduxHooks";
import { useAuth } from "./hooks/useAuth";
import { fetchUserBookings } from "./redux/slices/BookingSlice";
import LoadingScreen from "./components/utils/LoadingScreen";
import { useTranslation } from "react-i18next";

const BookingsLoader = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading: authLoading } = useAuth();
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      dispatch(fetchUserBookings());
    }
  }, [authLoading, isAuthenticated, dispatch]);

  return null;
};

const AppContent = () => {
  return (
    <>
      <BookingsLoader />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

function App() {
  const { i18n } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Provider store={store}>
      <LoadingScreen isLoading={isLoading} />
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <AuthProvider>
          <EventProvider>
            <AppContent />
          </EventProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

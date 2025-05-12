import { useEffect } from "react";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <h1 className="text-2xl font-['Playfair Display'] text-primary mb-2">AreebEvent</h1>
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;

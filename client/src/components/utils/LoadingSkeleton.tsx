import Skeleton from "./Skeleton";
const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="p-4 border rounded-lg shadow">
          <Skeleton className="w-full h-40 mb-4" />
          <Skeleton className="w-3/4 h-6 mb-2" />
          <Skeleton className="w-1/2 h-4" />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;

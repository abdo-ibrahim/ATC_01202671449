import clsx from "clsx";

const Skeleton = ({ className }: { className?: string }) => {
  return <div className={clsx("animate-pulse bg-gray-300 dark:bg-gray-700 rounded-md", className)} />;
};

export default Skeleton;

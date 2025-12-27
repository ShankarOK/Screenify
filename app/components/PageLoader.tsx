import Loader from "./Loader";

const PageLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <Loader size="lg" />
      <p className="text-gray-600 font-medium animate-pulse">Loading...</p>
    </div>
  );
};

export default PageLoader;


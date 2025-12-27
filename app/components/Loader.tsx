interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Loader = ({ size = "md", className = "" }: LoaderProps) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-[3px]",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={`${sizeClasses[size]} border-gray-200 border-t-[#606beb] rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;


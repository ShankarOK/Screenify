const SkeletonLine = ({ 
  width = "100%", 
  height = "1rem", 
  className = "" 
}: { 
  width?: string; 
  height?: string; 
  className?: string;
}) => (
  <div
    className={`bg-gray-200 rounded ${className}`}
    style={{
      width,
      height,
      background: "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer-gradient 2s ease-in-out infinite",
    }}
  />
);

const AuthCardSkeleton = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 lg:p-10">
        {/* Eyebrow Skeleton */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center mb-4">
            <SkeletonLine width="120px" height="1.75rem" className="rounded-full" />
          </div>
          
          <SkeletonLine width="250px" height="2rem" className="mx-auto mb-3" />
          <SkeletonLine width="280px" height="1rem" className="mx-auto mb-1" />
          <SkeletonLine width="240px" height="1rem" className="mx-auto" />
        </div>

        {/* Button Skeleton */}
        <div className="mb-6">
          <SkeletonLine width="100%" height="3.5rem" className="rounded-full" />
        </div>

        {/* Security Note Skeleton */}
        <div className="flex items-center justify-center">
          <SkeletonLine width="150px" height="1rem" />
        </div>
      </div>
    </div>
  );
};

export default AuthCardSkeleton;


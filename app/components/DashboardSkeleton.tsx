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

const DashboardSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="space-y-5">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white/95 backdrop-blur-sm rounded-3xl border border-gray-200/60 p-6 lg:p-8"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Section: Thumbnail & Basic Info */}
            <div className="flex items-start gap-5 lg:w-1/3">
              {/* Thumbnail Skeleton */}
              <div className="flex-shrink-0">
                <div className="w-28 h-28 rounded-2xl bg-gray-200 overflow-hidden">
                  <div
                    className="w-full h-full"
                    style={{
                      background: "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer-gradient 2s ease-in-out infinite",
                    }}
                  />
                </div>
              </div>

              {/* Basic Info Skeleton */}
              <div className="flex-1 min-w-0">
                <SkeletonLine width="140px" height="1.5rem" className="mb-2" />
                <SkeletonLine width="100px" height="1rem" className="mb-3" />
                <SkeletonLine width="80px" height="1rem" />
              </div>
            </div>

            {/* Right Section: Score & Details */}
            <div className="flex-1 lg:w-2/3">
              {/* Overall Score Skeleton */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0">
                  <div
                    className="w-full h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer-gradient 2s ease-in-out infinite",
                    }}
                  />
                </div>
                <div className="flex-1">
                  <SkeletonLine width="120px" height="1.25rem" className="mb-2" />
                  <SkeletonLine width="200px" height="1rem" />
                </div>
              </div>

              {/* Category Scores Grid Skeleton */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-3 rounded-xl bg-gray-50/50 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <SkeletonLine width="60px" height="0.875rem" />
                      <SkeletonLine width="30px" height="0.875rem" />
                    </div>
                    <SkeletonLine width="100%" height="0.625rem" className="rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSkeleton;


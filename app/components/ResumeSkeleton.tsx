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

const ResumeSkeleton = () => {
  return (
    <>
      {/* Left Panel - Resume Preview Skeleton */}
      <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-center">
        <div className="gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
          <div className="w-full h-full bg-gray-200 rounded-2xl overflow-hidden">
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
      </section>

      {/* Right Panel - Content Skeleton */}
      <section className="feedback-section">
        {/* Title Skeleton */}
        <div className="mb-8">
          <SkeletonLine width="200px" height="2.5rem" className="mb-2" />
        </div>

        <div className="flex flex-col gap-8">
          {/* Summary Card Skeleton */}
          <div className="bg-white rounded-2xl shadow-md w-full p-6">
            {/* Score Gauge and Title Section */}
            <div className="flex flex-row items-center gap-8 mb-6">
              {/* Circular Score Gauge Skeleton */}
              <div className="w-24 h-24 rounded-full bg-gray-200 flex-shrink-0">
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer-gradient 2s ease-in-out infinite",
                  }}
                />
              </div>
              
              {/* Title and Description */}
              <div className="flex flex-col gap-2 flex-1">
                <SkeletonLine width="180px" height="1.75rem" />
                <SkeletonLine width="100%" height="1rem" />
                <SkeletonLine width="80%" height="1rem" />
              </div>
            </div>

            {/* Category Rows */}
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="resume-summary">
                  <div className="category">
                    <div className="flex flex-row gap-2 items-center justify-center">
                      <SkeletonLine width="120px" height="1.5rem" />
                      <SkeletonLine width="60px" height="1.5rem" className="rounded-full" />
                    </div>
                    <SkeletonLine width="80px" height="1.5rem" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ATS Card Skeleton */}
          <div className="bg-gradient-to-b from-gray-100 to-white rounded-2xl shadow-md w-full p-6">
            {/* Icon and Title */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gray-200 flex-shrink-0">
                <div
                  className="w-full h-full rounded-lg"
                  style={{
                    background: "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer-gradient 2s ease-in-out infinite",
                  }}
                />
              </div>
              <div className="flex-1">
                <SkeletonLine width="200px" height="1.75rem" />
              </div>
            </div>

            {/* Description */}
            <div className="mb-6 space-y-2">
              <SkeletonLine width="250px" height="1.5rem" />
              <SkeletonLine width="100%" height="1rem" />
              <SkeletonLine width="90%" height="1rem" />
            </div>

            {/* Suggestions List */}
            <div className="space-y-3 mb-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-gray-200 flex-shrink-0 mt-1">
                    <div
                      className="w-full h-full rounded"
                      style={{
                        background: "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer-gradient 2s ease-in-out infinite",
                      }}
                    />
                  </div>
                  <SkeletonLine width="85%" height="1rem" />
                </div>
              ))}
            </div>

            {/* Closing Text */}
            <SkeletonLine width="70%" height="1rem" />
          </div>

          {/* Details Accordion Skeleton */}
          <div className="flex flex-col gap-4 w-full">
            {["Tone & Style", "Content", "Structure", "Skills"].map((title, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md p-4">
                {/* Accordion Header */}
                <div className="flex flex-row gap-4 items-center py-2">
                  <SkeletonLine width="140px" height="1.5rem" />
                  <SkeletonLine width="60px" height="1.5rem" className="rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ResumeSkeleton;


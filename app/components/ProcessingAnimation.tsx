interface ProcessingAnimationProps {
  currentStep: number;
}

const ProcessingAnimation = ({ currentStep }: ProcessingAnimationProps) => {
  const steps = [
    { name: "Uploading", icon: "📤" },
    { name: "Extracting", icon: "📄" },
    { name: "Analyzing", icon: "✨" },
    { name: "Generating", icon: "✔" },
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Main Animation Container */}
      <div className="relative z-10">
        {/* Floating Document Card with Step Track */}
        <div className="relative mb-8 lg:mb-12 h-48 lg:h-64">
          {/* Step Positions Track */}
          <div className="absolute inset-0 flex items-center justify-between px-4 lg:px-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className="w-1 h-1 rounded-full bg-gray-300 opacity-30"
              />
            ))}
          </div>

          {/* Document Card - Moves through steps */}
          <div className="relative h-full flex items-center">
            <div
              className="absolute transition-all duration-1000 ease-in-out"
              style={{
                left: `${(currentStep / 3) * 100}%`,
                transform: "translateX(-50%)",
              }}
            >
              {/* Document Card */}
              <div className="relative">
                {/* Glow Effect */}
                <div
                  className={`
                    absolute inset-0 rounded-2xl blur-xl transition-all duration-500
                    ${
                      currentStep < 3
                        ? "bg-gradient-to-br from-blue-400/40 to-purple-400/40"
                        : "bg-gradient-to-br from-green-400/40 to-emerald-400/40"
                    }
                    animate-pulse-slow
                  `}
                  style={{
                    transform: "scale(1.3)",
                  }}
                />

                {/* Card */}
                <div
                  className={`
                    relative w-28 h-36 lg:w-36 lg:h-44 bg-white rounded-2xl shadow-2xl 
                    border-2 transition-all duration-500
                    ${
                      currentStep < 3
                        ? "border-blue-200"
                        : "border-green-200"
                    }
                    animate-float
                  `}
                >
                  {/* Document Lines */}
                  <div className="p-3 lg:p-5 space-y-1.5 lg:space-y-2.5">
                    <div className="h-2 lg:h-2.5 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full w-3/4" />
                    <div className="h-2 lg:h-2.5 bg-gray-200 rounded-full w-full" />
                    <div className="h-2 lg:h-2.5 bg-gray-200 rounded-full w-5/6" />
                    <div className="h-2 lg:h-2.5 bg-gray-200 rounded-full w-4/6" />
                    <div className="h-2 lg:h-2.5 bg-gray-200 rounded-full w-full mt-2 lg:mt-3" />
                    <div className="h-2 lg:h-2.5 bg-gray-200 rounded-full w-3/4" />
                  </div>

                  {/* Processing Indicator */}
                  {currentStep < 3 && (
                    <div className="absolute bottom-2 right-2 lg:bottom-3 lg:right-3">
                      <div className="w-5 h-5 lg:w-7 lg:h-7 border-2 border-[#606beb] border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}

                  {/* Success Check */}
                  {currentStep === 3 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-2xl backdrop-blur-sm">
                      <div className="w-10 h-10 lg:w-14 lg:h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-subtle">
                        <svg
                          className="w-6 h-6 lg:w-8 lg:h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Flowing Particles / Neural Network Lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          {/* Animated Lines */}
          <svg
            className="w-full h-32"
            viewBox="0 0 800 200"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  stopColor="#8e98ff"
                  stopOpacity="0"
                >
                  <animate
                    attributeName="stop-opacity"
                    values="0;1;0"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop
                  offset="50%"
                  stopColor="#606beb"
                  stopOpacity="1"
                />
                <stop
                  offset="100%"
                  stopColor="#8e98ff"
                  stopOpacity="0"
                >
                  <animate
                    attributeName="stop-opacity"
                    values="0;1;0"
                    dur="2s"
                    begin="1s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>
            </defs>
            <path
              d="M 0 100 Q 200 50 400 100 T 800 100"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              className="animate-shimmer"
            />
          </svg>

          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-float"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${3 + i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessingAnimation;


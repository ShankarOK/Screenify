interface Step {
  label: string;
  status: "pending" | "active" | "completed";
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

const ProgressStepper = ({
  steps,
  currentStep,
  className = "",
}: ProgressStepperProps) => {
  const stepIcons = [
    <svg key="upload" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>,
    <svg key="extract" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>,
    <svg key="analyze" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>,
    <svg key="generate" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
  ];

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isPending = index > currentStep;

          return (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1 relative z-10">
                {/* Step Circle */}
                <div className="relative">
                  <div
                    className={`
                      w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-500 shadow-lg
                      ${isCompleted
                        ? "bg-gradient-to-br from-green-500 to-green-600 text-white scale-100"
                        : isActive
                        ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white scale-110 ring-4 ring-blue-200/50 animate-pulse-slow"
                        : "bg-gray-200 text-gray-500 scale-100"
                      }
                    `}
                  >
                    {isCompleted ? (
                      <svg
                        className="w-7 h-7"
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
                    ) : (
                      <div className="flex items-center justify-center">
                        {stepIcons[index] || index + 1}
                      </div>
                    )}
                  </div>
                  {/* Active Pulse Effect */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl bg-blue-400 animate-ping opacity-20"></div>
                  )}
                </div>
                
                {/* Step Label */}
                <div className="mt-4 text-center">
                  <p
                    className={`
                      text-sm font-bold transition-colors duration-300 mb-1
                      ${isActive
                        ? "text-blue-600"
                        : isCompleted
                        ? "text-green-600"
                        : "text-gray-400"
                      }
                    `}
                  >
                    {step.label}
                  </p>
                  {isActive && (
                    <div className="w-12 h-1 bg-blue-200 rounded-full mx-auto overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full animate-shimmer"></div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-1.5 mx-4 relative -z-0">
                  <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                  <div
                    className={`
                      absolute inset-0 rounded-full transition-all duration-700
                      ${isCompleted
                        ? "bg-gradient-to-r from-green-500 to-green-400 w-full"
                        : isActive
                        ? "bg-gradient-to-r from-green-500 via-blue-500 to-blue-200 w-1/2"
                        : "bg-transparent w-0"
                      }
                    `}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressStepper;


interface Step {
  label: string;
  status: "pending" | "active" | "completed";
  description?: string;
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
    // Uploading
    <svg
      key="upload"
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
      />
    </svg>,
    // Extracting
    <svg
      key="extract"
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>,
    // Analyzing
    <svg
      key="analyze"
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>,
    // Generating
    <svg
      key="generate"
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>,
  ];

  const stepDescriptions = [
    "Securely receiving your resume",
    "Reading and structuring content",
    "Detecting skills and strengths",
    "Preparing insights for you",
  ];

  return (
    <div className={`w-full max-w-5xl mx-auto px-4 ${className}`}>
      <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-white/60 shadow-2xl p-6 lg:p-10">
        {/* Horizontal Stepper */}
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-6 lg:top-8 left-0 right-0 h-1 bg-gray-200 rounded-full z-0">
            <div
              className="h-full bg-gradient-to-r from-[#8e98ff] via-[#606beb] to-[#8e98ff] rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${(currentStep / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>

          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isPending = index > currentStep;

            return (
              <div
                key={index}
                className="flex flex-col items-center flex-1 relative z-10"
              >
                {/* Step Circle */}
                <div className="relative mb-3 lg:mb-4">
                  {/* Glow Effect for Active Step */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#8e98ff] to-[#606beb] opacity-40 blur-lg animate-pulse-slow scale-150" />
                  )}

                  {/* Completed Pulse */}
                  {isCompleted && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#8e98ff] to-[#606beb] opacity-30 animate-ping" />
                  )}

                  <div
                    className={`
                      relative w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center
                      transition-all duration-500 ease-out
                      ${
                        isCompleted
                          ? "bg-gradient-to-br from-[#8e98ff] to-[#606beb] text-white shadow-lg scale-100"
                          : isActive
                          ? "bg-white border-2 border-[#606beb] text-[#606beb] shadow-xl scale-110 ring-4 ring-[#606beb]/20"
                          : "bg-white border-2 border-gray-200 text-gray-400 shadow-sm scale-100"
                      }
                    `}
                  >
                    {isCompleted ? (
                      <svg
                        className="w-5 h-5 lg:w-7 lg:h-7"
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
                      <div
                        className={`
                          transition-all duration-300
                          ${isActive ? "animate-pulse-slow" : ""}
                        `}
                      >
                        <div className="w-5 h-5 lg:w-6 lg:h-6">
                          {stepIcons[index]}
                        </div>
                      </div>
                    )}

                    {/* Active Spinner */}
                    {isActive && (
                      <div className="absolute inset-0 border-2 border-[#606beb] border-t-transparent rounded-full animate-spin opacity-50" />
                    )}
                  </div>
                </div>

                {/* Step Label */}
                <div className="text-center mb-2">
                  <div
                    className={`
                      font-semibold text-xs lg:text-sm mb-1 transition-colors duration-300
                      ${
                        isActive
                          ? "text-gray-900"
                          : isCompleted
                          ? "text-gray-900"
                          : "text-gray-400"
                      }
                    `}
                  >
                    {step.label}
                  </div>
                  <div
                    className={`
                      text-[10px] lg:text-xs font-medium transition-all duration-300 hidden lg:block
                      ${
                        isActive
                          ? "text-[#606beb] opacity-100"
                          : isCompleted
                          ? "text-gray-600 opacity-70"
                          : "text-gray-400 opacity-50"
                      }
                    `}
                  >
                    {stepDescriptions[index]}
                  </div>
                </div>

                {/* Status Badge */}
                <div
                  className={`
                    text-xs px-3 py-1 rounded-full font-medium transition-all duration-300
                    ${
                      isCompleted
                        ? "bg-green-50 text-green-700"
                        : isActive
                        ? "bg-blue-50 text-blue-700"
                        : "bg-gray-50 text-gray-500"
                    }
                  `}
                >
                  {isCompleted
                    ? "Completed"
                    : isActive
                    ? "In Progress"
                    : "Pending"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressStepper;

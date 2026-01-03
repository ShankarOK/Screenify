import React from 'react';

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // Determine background gradient based on score
  const gradientClass = score > 69
    ? 'from-green-100'
    : score > 49
      ? 'from-yellow-100'
      : 'from-red-100';

  // Determine icon based on score
  const iconSrc = score > 69
    ? '/icons/ats-good.svg'
    : score > 49
      ? '/icons/ats-warning.svg'
      : '/icons/ats-bad.svg';

  // Determine subtitle based on score
  const subtitle = score > 69
    ? 'Great Job!'
    : score > 49
      ? 'Good Start'
      : 'Needs Improvement';

  return (
    <div className={`bg-gradient-to-br ${gradientClass} to-white rounded-3xl shadow-lg border border-gray-200/60 w-full p-6 lg:p-8 overflow-hidden hover:shadow-xl transition-all duration-300`}>
      {/* Top section with icon and headline */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-xl bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center border border-gray-200/60">
          <img src={iconSrc} alt="ATS Score Icon" className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">ATS Score - {score}/100</h2>
        </div>
      </div>

      {/* Description section */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3 bg-white/60 backdrop-blur-sm border border-gray-200/60">
          <h3 className="text-lg font-semibold text-gray-800">{subtitle}</h3>
        </div>
        <p className="text-gray-700 mb-6 leading-relaxed">
          This score represents how well your resume is likely to perform in Applicant Tracking Systems used by employers.
        </p>

        {/* Suggestions list */}
        <div className="space-y-3 mb-6">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-3 p-3 rounded-lg ${
                suggestion.type === "good" 
                  ? "bg-green-50/80 border border-green-200/60" 
                  : "bg-amber-50/80 border border-amber-200/60"
              } transition-all duration-200 hover:shadow-sm`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                suggestion.type === "good" ? "bg-green-100" : "bg-amber-100"
              }`}>
                <img
                  src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                  alt={suggestion.type === "good" ? "Check" : "Warning"}
                  className="w-4 h-4"
                />
              </div>
              <p className={`text-sm lg:text-base leading-relaxed ${
                suggestion.type === "good" ? "text-green-800" : "text-amber-800"
              }`}>
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing encouragement */}
      <div className="pt-4 border-t border-gray-200/60">
        <p className="text-gray-600 italic text-sm lg:text-base">
          Keep refining your resume to improve your chances of getting past ATS filters and into the hands of recruiters.
        </p>
      </div>
    </div>
  )
}

export default ATS

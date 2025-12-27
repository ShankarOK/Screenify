const HeroMockup = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Main Card Container */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 transform rotate-1 hover:rotate-0 transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
          </div>
          <span className="text-xs text-gray-500 font-medium">Resume Analysis</span>
        </div>

        {/* Resume Preview Section */}
        <div className="mb-4">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
            <div className="space-y-2">
              <div className="h-3 bg-blue-200 rounded w-3/4"></div>
              <div className="h-2 bg-blue-100 rounded w-full"></div>
              <div className="h-2 bg-blue-100 rounded w-5/6"></div>
              <div className="h-2 bg-purple-100 rounded w-4/5 mt-3"></div>
              <div className="h-2 bg-purple-100 rounded w-full"></div>
            </div>
          </div>
        </div>

        {/* ATS Score Badge */}
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-full px-6 py-3 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="text-white">
                <div className="text-xs font-medium opacity-90">ATS Score</div>
                <div className="text-3xl font-bold">78</div>
              </div>
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin-slow"></div>
            </div>
          </div>
        </div>

        {/* Insights Block */}
        <div className="space-y-2">
          <div className="flex items-start gap-2 p-2 bg-green-50 rounded-lg border border-green-100">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-green-800">Strong keywords</div>
              <div className="text-xs text-green-700">Good use of industry terms</div>
            </div>
          </div>
          <div className="flex items-start gap-2 p-2 bg-yellow-50 rounded-lg border border-yellow-100">
            <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-yellow-800">Formatting</div>
              <div className="text-xs text-yellow-700">Consider simpler layout</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200/20 rounded-full blur-2xl -z-10"></div>
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl -z-10"></div>
    </div>
  );
};

export default HeroMockup;


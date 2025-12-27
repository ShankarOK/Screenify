const AuthIllustration = () => {
  return (
    <div className="hidden lg:flex items-center justify-center w-full max-w-md">
      <div className="relative w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 transform rotate-2">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
            <span className="text-xs text-gray-500 font-medium">Resume Analysis</span>
          </div>

          {/* Score Badge */}
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-full px-5 py-3 shadow-lg">
              <div className="text-center text-white">
                <div className="text-xs font-medium opacity-90">ATS Score</div>
                <div className="text-2xl font-bold">85</div>
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
              <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-xs font-medium text-green-800">Strong keywords</div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
              <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-xs font-medium text-blue-800">Well structured</div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-200/20 rounded-full blur-2xl -z-10"></div>
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-200/20 rounded-full blur-2xl -z-10"></div>
      </div>
    </div>
  );
};

export default AuthIllustration;


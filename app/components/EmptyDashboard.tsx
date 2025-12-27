import { Link } from "react-router";


export const EmptyDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center py-32 lg:py-40 relative">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 bg-blue-100/20 rounded-full blur-3xl"></div>
        <div className="w-48 h-48 bg-purple-100/20 rounded-full blur-2xl absolute"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Enhanced Icon Container */}
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center border-2 border-gray-200/60 shadow-xl">
            <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          {/* Floating Decorative Elements */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full opacity-60 animate-float"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-purple-400 rounded-full opacity-60 animate-float-delayed"></div>
        </div>
        
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-center">
          No resumes yet
        </h2>
        
        <p className="text-gray-600 text-center max-w-lg mb-10 leading-relaxed text-lg">
          Upload your first resume to get AI insights and ATS scoring.
        </p>
        
        <Link
          to="/upload"
          className="primary-button w-fit px-12 py-4 text-lg font-semibold hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Upload Resume
        </Link>
      </div>
    </div>
  );
};


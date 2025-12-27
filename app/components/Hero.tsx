import { usePuterStore } from "~/lib/puter";

const Hero = () => {
  const { auth, isLoading } = usePuterStore();
  const isAuthenticated = !isLoading && auth.isAuthenticated;

  const scrollToFeatures = () => {
    const element = document.getElementById('features');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const audienceTags = ["Students", "Job Switchers", "Freshers", "Professionals"];

  return (
    <>
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16 lg:py-24 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="flex flex-col gap-7 text-center lg:text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100 w-fit mx-auto lg:mx-0 mb-2">
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                AI Resume Analysis
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
              Get your resume past{" "}
              <span className="text-gradient">ATS filters</span>
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Upload your resume and get instant AI-powered feedback. See your ATS score, understand your strengths, and get clear suggestions to improve.
            </p>

            {/* Audience Tags Section */}
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-500 font-medium">
                Made for job seekers of all kinds:
              </p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {audienceTags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Supporting Note */}
            <p className="text-sm text-gray-500 mt-2">
              Takes seconds. Private & secure.
            </p>
          </div>

          {/* Right Side - Visual Mockup */}
          <div className="flex items-center justify-center lg:justify-end">
            <HeroVisual />
          </div>
        </div>
      </section>
    </>
  );
};

// Enhanced Visual Mockup Component
const HeroVisual = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto animate-fade-in">
      {/* Main Card Container */}
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 transform hover:scale-[1.01] transition-all duration-300 relative z-10 hover:shadow-3xl">
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
          <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-lg p-4 border border-blue-100 shadow-sm">
            <div className="space-y-2">
              <div className="h-3 bg-blue-200 rounded w-3/4"></div>
              <div className="h-2 bg-blue-100 rounded w-full"></div>
              <div className="h-2 bg-blue-100 rounded w-5/6"></div>
              <div className="h-2 bg-purple-100 rounded w-4/5 mt-3"></div>
              <div className="h-2 bg-purple-100 rounded w-full"></div>
            </div>
          </div>
        </div>

        {/* ATS Score Badge with Animation */}
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-full px-6 py-3 shadow-lg relative overflow-hidden animate-pulse-shadow">
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="text-white">
                  <div className="text-xs font-medium opacity-90">ATS Score</div>
                  <div className="text-3xl font-bold">78</div>
                </div>
                <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin-slow"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Insights Block */}
        <div className="space-y-2">
          {/* Strength */}
          <div className="flex items-start gap-2 p-2.5 bg-green-50 rounded-lg border border-green-100 hover:shadow-sm transition-shadow duration-200">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5 animate-bounce-subtle">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-green-800">Strong keywords</div>
              <div className="text-xs text-green-700">Good use of industry terms</div>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-2 p-2.5 bg-yellow-50 rounded-lg border border-yellow-100 hover:shadow-sm transition-shadow duration-200">
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

          {/* Info */}
          <div className="flex items-start gap-2 p-2.5 bg-blue-50 rounded-lg border border-blue-100 hover:shadow-sm transition-shadow duration-200">
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-blue-800">Experience clarity</div>
              <div className="text-xs text-blue-700">Well-structured sections</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200/20 rounded-full blur-2xl -z-10 animate-float"></div>
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl -z-10 animate-float-delayed"></div>
    </div>
  );
};

export default Hero;


import { useEffect, useState } from "react";
import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

const DashboardResumeCard = ({ resume }: { resume: Resume }) => {
  const { id, companyName, jobTitle, feedback, imagePath } = resume;
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadResume = async () => {
      if (!imagePath) return;
      const blob = await fs.read(imagePath);
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };
    loadResume();
  }, [imagePath, fs]);

  const formatDate = () => {
    return "Recently";
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-700 bg-green-50/60 border-green-200/60";
    if (score >= 50) return "text-amber-700 bg-amber-50/60 border-amber-200/60";
    return "text-red-700 bg-red-50/60 border-red-200/60";
  };

  const getScoreBg = (score: number) => {
    if (score >= 70) return "bg-green-500";
    if (score >= 50) return "bg-amber-500";
    return "bg-red-500";
  };

  const overallScore = feedback?.overallScore || 0;
  const atsScore = feedback?.ATS?.score || overallScore;
  const toneScore = feedback?.toneAndStyle?.score || 0;
  const contentScore = feedback?.content?.score || 0;
  const structureScore = feedback?.structure?.score || 0;
  const skillsScore = feedback?.skills?.score || 0;

  // Get more insights
  const strengths = feedback?.ATS?.tips?.filter(t => t.type === "good").slice(0, 2) || [];
  const improvements = feedback?.ATS?.tips?.filter(t => t.type === "improve").slice(0, 2) || [];
  const allInsights = [...strengths, ...improvements].slice(0, 4);

  return (
    <Link
      to={`/resume/${id}`}
      className="group block relative bg-white/95 backdrop-blur-sm rounded-3xl border border-gray-200/60 p-6 lg:p-8 hover:border-gray-300/80 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer overflow-hidden"
    >
      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-6">
        {/* Left Section: Thumbnail & Basic Info */}
        <div className="flex items-start gap-5 lg:w-1/3">
          {/* Thumbnail with Enhanced Design */}
          <div className="flex-shrink-0 relative">
            {resumeUrl ? (
              <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-gray-200/60 bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-500">
                <img
                  src={resumeUrl}
                  alt="Resume preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
              </div>
            ) : (
              <div className="relative w-28 h-28 rounded-2xl bg-gray-200 border-2 border-gray-200/60 shadow-lg overflow-hidden">
                <div
                  className="w-full h-full"
                  style={{
                    background: "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer-gradient 2s ease-in-out infinite",
                  }}
                />
              </div>
            )}
            {/* Status Indicator */}
            <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getScoreBg(overallScore)} shadow-sm`}></div>
          </div>

          {/* Basic Info with Enhanced Typography */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900 mb-1.5 leading-tight group-hover:text-gray-700 transition-colors flex items-center gap-2">
                  {companyName || jobTitle || "Resume"}
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </h3>
                {companyName && jobTitle && (
                  <p className="text-sm text-gray-600 mb-2 leading-relaxed flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.911 23.911 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {jobTitle}
                  </p>
                )}
                <p className="text-xs text-gray-400 font-medium mb-4 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Uploaded {formatDate()}
                </p>
              </div>
            </div>

            {/* Enhanced Score Badges with Icons */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-xs text-gray-500 font-medium">Overall</span>
                </div>
                <div className={`px-4 py-2.5 rounded-xl border-2 font-bold text-base transition-all duration-300 group-hover:scale-105 shadow-sm ${getScoreColor(overallScore)}`}>
                  {Math.round(overallScore)}/100
                </div>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-xs text-gray-500 font-medium">ATS</span>
                </div>
                <div className={`px-4 py-2.5 rounded-xl border-2 font-bold text-base transition-all duration-300 group-hover:scale-105 shadow-sm ${getScoreColor(atsScore)}`}>
                  {Math.round(atsScore)}/100
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Detailed Scores & Insights */}
        <div className="flex-1 lg:border-l border-gray-200/60 lg:pl-8">
          {/* Category Scores Grid with Enhanced Design */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h4 className="text-sm font-bold text-gray-800">Category Scores</h4>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Tone & Style", score: toneScore, icon: "🎨" },
                { label: "Content", score: contentScore, icon: "📝" },
                { label: "Structure", score: structureScore, icon: "🏗️" },
                { label: "Skills", score: skillsScore, icon: "⚡" },
              ].map((category, idx) => (
                <div key={idx} className="flex flex-col gap-2 p-3 rounded-xl bg-gray-50/50 border border-gray-100 group-hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{category.icon}</span>
                      <span className="text-xs text-gray-700 font-semibold">{category.label}</span>
                    </div>
                    <span className={`text-xs font-bold ${getScoreColor(category.score).split(' ')[0]}`}>
                      {Math.round(category.score)}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                    <div
                      className={`h-full ${getScoreBg(category.score)} transition-all duration-700 group-hover:opacity-90 shadow-sm`}
                      style={{ width: `${Math.min(category.score, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider with Style */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </div>
          </div>

          {/* Enhanced Insights Section */}
          {allInsights.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h4 className="text-sm font-bold text-gray-800">Key Insights</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {allInsights.map((insight, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all duration-300 group-hover:shadow-md ${
                      insight.type === "good"
                        ? "text-green-800 bg-gradient-to-br from-green-50/80 to-green-50/40 border-green-200/60 group-hover:from-green-50 group-hover:to-green-50"
                        : "text-amber-800 bg-gradient-to-br from-amber-50/80 to-amber-50/40 border-amber-200/60 group-hover:from-amber-50 group-hover:to-amber-50"
                    }`}
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                      insight.type === "good" ? "bg-green-100" : "bg-amber-100"
                    }`}>
                      <svg
                        className={`w-5 h-5 ${
                          insight.type === "good" ? "text-green-600" : "text-amber-600"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {insight.type === "good" ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        )}
                      </svg>
                    </div>
                    <p className="text-xs font-semibold leading-relaxed flex-1">
                      {insight.tip.length > 65 ? insight.tip.substring(0, 65) + "..." : insight.tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default DashboardResumeCard;


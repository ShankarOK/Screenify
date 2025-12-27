interface DashboardStatsProps {
  totalResumes: number;
  averageScore: number;
  bestScore: number;
}

export const DashboardStats = ({ totalResumes, averageScore, bestScore }: DashboardStatsProps) => {
  const stats = [
    {
      label: "Total Resumes",
      value: totalResumes,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      label: "Average Score",
      value: `${Math.round(averageScore)}`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      label: "Best Score",
      value: `${Math.round(bestScore)}`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 border border-gray-200/60 shadow-sm hover:shadow-lg hover:border-gray-300/60 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center text-gray-600 flex-shrink-0">
            {stat.icon}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-2xl font-bold text-gray-900 leading-tight">{stat.value}</span>
            <span className="text-xs text-gray-500 font-medium mt-1">{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};


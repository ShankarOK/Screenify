import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import ResumeSkeleton from "~/components/ResumeSkeleton";
import Summary from "~/components/Summary";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Screenify | Review " },
  { name: "description", content: "Detailed overview of your resume" },
];

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate(`/auth?next=/resume/${id}`);
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);

      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
      console.log({ resumeUrl, imageUrl, feedback: data.feedback });
    };

    loadResume();
  }, [id]);

  const isDataLoading = !imageUrl || !resumeUrl || !feedback;

  return (
    <main className="!pt-0 relative">
      {/* Floating Navigation Buttons */}
      <div className="fixed top-6 left-6 z-50 flex flex-col gap-3">
        {/* Home Button */}
        <Link
          to="/"
          className="floating-nav-button"
          aria-label="Go to homepage"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="floating-nav-tooltip">Home</span>
        </Link>
        
        {/* Back to Dashboard Button */}
        <Link
          to="/dashboard"
          className="floating-nav-button"
          aria-label="Go back to dashboard"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="floating-nav-tooltip">Dashboard</span>
        </Link>
      </div>

      <div className="flex flex-row w-full max-lg:flex-col-reverse min-h-screen">
        {isDataLoading ? (
          <ResumeSkeleton />
        ) : (
          <>
            {/* Left Panel - Resume Preview */}
            <section className="feedback-section bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 h-[100vh] sticky top-0 items-center justify-center overflow-hidden">
              <div className="relative w-full h-full flex items-center justify-center p-6 lg:p-8">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                
                {/* Resume Preview Card */}
                <div className="relative z-10 animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit shadow-2xl hover:shadow-3xl transition-shadow duration-500">
                  <a 
                    href={resumeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src={imageUrl}
                        className="w-full h-full object-contain rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                        title="resume"
                        alt="Resume preview"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span className="text-sm font-semibold text-gray-700">Click to open PDF</span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </section>

            {/* Right Panel - Review Content */}
            <section className="feedback-section bg-white">
              <div className="sticky top-6">
                {/* Page Header */}
                <div className="mb-8 animate-in fade-in duration-1000">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100 mb-4">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Detailed Analysis</span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-2">
                    Resume Review
                  </h2>
                  <p className="text-gray-600 text-base">
                    Comprehensive insights to help you improve your resume
                  </p>
                </div>

                {/* Review Components */}
                <div className="flex flex-col gap-6 animate-in fade-in duration-1000">
                  <Summary feedback={feedback} />
                  <ATS
                    score={feedback.ATS.score || 0}
                    suggestions={feedback.ATS.tips || []}
                  />
                  <Details feedback={feedback} />
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
};
export default Resume;

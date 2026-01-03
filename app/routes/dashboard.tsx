import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import DashboardResumeCard from "~/components/DashboardResumeCard";
import DashboardSkeleton from "~/components/DashboardSkeleton";
import { EmptyDashboard } from "~/components/EmptyDashboard";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";
import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Screenify | Dashboard" },
    { name: "description", content: "Track your applications and resume ratings" },
  ];
}

export default function Dashboard() {
  const { auth, isLoading, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/dashboard");
    }
  }, [auth.isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    const loadResumes = async () => {
      if (!auth.isAuthenticated) return;
      
      setLoadingResumes(true);

      const resumes = (await kv.list("resume:*", true)) as KVItem[];

      const parsedResumes = resumes?.map(
        (resume) => JSON.parse(resume.value) as Resume
      );

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    if (auth.isAuthenticated) {
      loadResumes();
    }
  }, [kv, auth.isAuthenticated]);

  if (isLoading) {
    return (
      <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        <Navbar />
        <div className="w-full max-w-7xl mx-auto px-6 pb-8 lg:pb-12 relative z-10 page-content-spacing">
          <DashboardSkeleton count={3} />
        </div>
      </main>
    );
  }

  if (!auth.isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <Navbar />
      
      <div className="w-full max-w-7xl mx-auto px-6 pb-8 lg:pb-12 relative z-10 page-content-spacing">
        {loadingResumes ? (
          <DashboardSkeleton count={3} />
        ) : resumes.length > 0 ? (
          <div className="space-y-5">
            {resumes.map((resume, index) => (
              <div key={resume.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <DashboardResumeCard resume={resume} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyDashboard />
        )}
      </div>
    </main>
  );
}


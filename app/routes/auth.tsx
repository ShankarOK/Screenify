import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthCard } from "~/components/AuthCard";
import AuthIllustration from "~/components/AuthIllustration";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Screenify | Auth" },
  { name: "description", content: "Log into your account" },
];

const Auth = () => {
  const { auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1] || "/";
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/auth");
  };

  // Only redirect if authenticated and there's a next parameter (not when showing logout UI)
  useEffect(() => {
    if (auth.isAuthenticated && next && next !== "/auth") {
      navigate(next);
    }
  }, [auth.isAuthenticated, next, navigate]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Auth Card */}
          <div className="flex flex-col items-center lg:items-start">
            {/* App Name & Tagline */}
            <div className="mb-8 text-center lg:text-left">
              <Link to="/" className="inline-block mb-2">
                <h1 className="text-4xl lg:text-5xl font-bold text-gradient">
                  Screenify
                </h1>
              </Link>
              <p className="text-gray-500 text-sm font-medium">
                Smart AI Resume Analysis
              </p>
            </div>

            {/* Auth Card */}
            <AuthCard onLogout={handleLogout} />
          </div>

          {/* Right Side - Illustration (Desktop Only) */}
          <AuthIllustration />
        </div>
      </div>
    </main>
  );
};

export default Auth;

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const { auth, isLoading } = usePuterStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/auth");
  };

  const handleUploadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isAuthenticated = !isLoading && auth.isAuthenticated;
    if (!isAuthenticated) {
      e.preventDefault();
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 3000);
    }
  };

  const isAuthenticated = !isLoading && auth.isAuthenticated;
  const currentPath = location.pathname;
  const isDashboard = currentPath === "/dashboard";
  const isUpload = currentPath === "/upload";
  const isResume = currentPath.startsWith("/resume/");
  const isAuth = currentPath === "/auth";
  const isHome = currentPath === "/";

  return (
    <>
      <nav className="navbar fixed-navbar">
        <Link to="/">
          <p className="text-2xl font-bold text-gradient">Screenify</p>
        </Link>
        <div className="flex items-center gap-4">
          {/* Upload Resume - Hide when on upload page */}
          {!isUpload && (
            <Link
              to={isAuthenticated ? "/upload" : "/auth"}
              onClick={handleUploadClick}
              className="primary-button w-fit relative"
            >
              Upload Resume
              {showLoginPrompt && (
                <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-xl whitespace-nowrap z-50 animate-fade-in pointer-events-none">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Please log in first to upload your resume
                  </div>
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45"></div>
                </div>
              )}
            </Link>
          )}
          
          {/* Secondary button - changes based on auth state */}
          {isAuthenticated ? (
            <>
              {/* Dashboard - Hide when on dashboard or resume page */}
              {!isDashboard && !isResume && (
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-gray-700 font-medium hover:text-gray-900 transition-colors"
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="logout-button w-fit"
                type="button"
                aria-label="Log out of your account"
              >
                Logout
              </button>
            </>
          ) : (
            // Log In - Hide when on auth page
            !isAuth && (
              <Link
                to="/auth"
                className="px-4 py-2 text-gray-700 font-medium hover:text-gray-900 transition-colors"
              >
                Log In
              </Link>
            )
          )}
        </div>
      </nav>
    </>
  );
};
export default Navbar;

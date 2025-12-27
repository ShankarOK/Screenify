import { Link, useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const { auth, isLoading } = usePuterStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/auth");
  };

  const isAuthenticated = !isLoading && auth.isAuthenticated;
  const isDashboard = location.pathname === "/dashboard";

  return (
    <nav className="navbar">
      <Link to="/">
        <p className="text-2xl font-bold text-gradient">Screenify</p>
      </Link>
      <div className="flex items-center gap-4">
        {/* Upload Resume - Always visible */}
        <Link
          to={isAuthenticated ? "/upload" : "/auth"}
          className="primary-button w-fit"
        >
          Upload Resume
        </Link>
        
        {/* Secondary button - changes based on auth state */}
        {isAuthenticated ? (
          <>
            <Link
              to="/dashboard"
              className={`px-4 py-2 font-medium transition-colors ${
                isDashboard
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Dashboard
            </Link>
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
          <Link
            to="/auth"
            className="px-4 py-2 text-gray-700 font-medium hover:text-gray-900 transition-colors"
          >
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
};
export default Navbar;

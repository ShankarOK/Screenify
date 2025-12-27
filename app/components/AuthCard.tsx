import { usePuterStore } from "~/lib/puter";
import Loader from "./Loader";

interface AuthCardProps {
  onLogout?: () => void;
}

export const AuthCard = ({ onLogout }: AuthCardProps) => {
  const { isLoading, auth } = usePuterStore();
  const isAuthenticated = auth.isAuthenticated;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 lg:p-10">
        {/* Eyebrow */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100 mb-4">
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
              {isAuthenticated ? "Welcome back" : "Welcome"}
            </span>
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            {isAuthenticated ? "You're signed in" : "Log in to continue"}
          </h1>
          
          <p className="text-gray-600 leading-relaxed">
            {isAuthenticated
              ? "Access your uploads, insights, and ATS feedback."
              : "Access your uploads, insights, and ATS feedback."}
          </p>
        </div>

        {/* Auth Button */}
        <div className="mb-6">
          {isLoading ? (
            <button
              className="w-full primary-button flex items-center justify-center gap-3 py-4 disabled:opacity-70"
              disabled
              aria-label="Loading authentication"
            >
              <Loader size="sm" />
              <span>Signing you in...</span>
            </button>
          ) : (
            <>
              {isAuthenticated ? (
                <button
                  className="w-full primary-button flex items-center justify-center gap-3 py-4 hover:shadow-lg transition-all duration-200"
                  onClick={onLogout}
                  type="button"
                  aria-label="Log out of your account"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Log Out</span>
                </button>
              ) : (
                <button
                  className="w-full primary-button flex items-center justify-center gap-3 py-4 hover:shadow-lg transition-all duration-200"
                  onClick={auth.signIn}
                  type="button"
                  aria-label="Log in to your account"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Log In</span>
                </button>
              )}
            </>
          )}
        </div>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span>Secure authentication</span>
        </div>

        {/* Terms Note */}
        {!isAuthenticated && (
          <p className="text-xs text-gray-400 text-center mt-4">
            By continuing, you agree to the terms of use.
          </p>
        )}
      </div>
    </div>
  );
};

